import cors from 'cors';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
/* eslint-disable import/extensions, no-console */
import { estimator, estimatorXml } from './controllers/estimator.controller.js';
import { schemas, validateBody } from './validator.js';
import LogController from './controllers/log.controller.js';
/* eslint-disable import/extensions, no-console */


const app = express();

app.use(compression());
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.options('*', cors());

/* eslint-disable no-underscore-dangle, no-console */
const __dirname = path.resolve();
global.basedir = __dirname;
/* eslint-disable no-underscore-dangle, no-console */

if (!fs.existsSync(path.join(__dirname, 'logs/access.log'))) {
  fs.mkdirSync('logs');
}

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a+' });
morgan.token('response-time-ms', function getResponse(req, res) {
  const time = this['response-time'](req, res, 0) < 10 ? `0${this['response-time'](req, res, 0)}ms` : `${this['response-time'](req, res, 0)}ms`;
  return time;
});
app.use(morgan(':method\t:url\t:status\t:response-time-ms', { stream: accessLogStream }));

app.post('/api/v1/on-covid-19/', validateBody(schemas.input), estimator);
app.get('/api/v1/on-covid-19/logs', LogController.logs);
app.post('/api/v1/on-covid-19/json', validateBody(schemas.input), estimator);
app.post('/api/v1/on-covid-19/xml', validateBody(schemas.input), estimatorXml);
// app.post('/api/v1/on-covid-19/:responseType', EstimatorController.estimator); // for heroku

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const PORT = process.env.PORT || 3000;
// const host = '0.0.0.0';

const server = app.listen(PORT, () => {
  // console.log('COVID-19 infections estimator RESTful API server started on: ' + PORT);
});
export default server;
