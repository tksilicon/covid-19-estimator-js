import cors from 'cors';
import bodyParser from 'body-parser';
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
import EstimatorController from './controllers/estimator.controller.js';
/* eslint-disable import/extensions, no-console */

const app = express();

app.use(compression());
dotenv.config();
app.use(helmet());
app.use(cors());
// app.options('*', cors());

/* eslint-disable no-underscore-dangle, no-console */
const __dirname = path.resolve();
global.__basedir = __dirname;
/* eslint-disable no-underscore-dangle, no-console */

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan(':method :url :status :response-time ms', { stream: accessLogStream }));

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/v1/on-covid-19/', EstimatorController.estimator);
app.get('/api/v1/on-covid-19/logs', EstimatorController.logs);
app.post('/api/v1/on-covid-19/json', EstimatorController.estimator);
app.post('/api/v1/on-covid-19/xml', EstimatorController.estimator);
app.post('/api/v1/on-covid-19/:responseType', EstimatorController.estimator); // for heroku

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/logs', (req, res) => {
  res.redirect('/api/v1/on-covid-19/logs');
});

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const PORT = process.env.PORT || 3000;
// const host = '0.0.0.0';

const server = app.listen(PORT, () => {
  // console.log('COVID-19 infections estimator RESTful API server started on: ' + PORT);
});
export default server;
