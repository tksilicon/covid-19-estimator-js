/**
 * The controller defined below is the estimator
 * controller with only on function (endpoint)
 * which returns estimated data
 *
 */
/* eslint-disable import/extensions, no-console */
import path from 'path';
import xml2 from 'xml2js';
import fs from 'fs';
import covid19ImpactEstimator from '../estimator.js';
/* eslint-disable import/extensions, no-console */

/**
 * This method outputs COVID-19 estimates using a response type
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
/* eslint-disable */
export const estimator = async (req, res, next) => {
  /* eslint-enable */
  try {
    const days = covid19ImpactEstimator(req.body);
    return res.status(200).json(days);
  } catch (error) {
    return next(error);
  }
};
/**
* This method outputs COVID-19 estimates using a response type
* @param {*} req
* @param {*} res
* @param {*} next
*/
/* eslint-disable */
export const estimatorXml = async (req, res, next) => {
  /* eslint-enable */
  try {
    const builder = new xml2.Builder({
      renderOpts: { pretty: true }
    });
    const xml = covid19ImpactEstimator(req.body);
    return res.status(200).type('application/xml').send(builder.buildObject(xml));
  } catch (error) {
    return next(error);
  }
};

/**
 * This method outputs COVID-19 logs
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const logs = async (req, res) => {
  try {
    /* eslint-disable no-undef, no-console */
    const basePath = __basedir;
    const filepath = path.join(basePath, 'access.log');
    const logData = [];
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) throw err;
      logData.push(data.toString()); //
    });
    return res.type('text/plain').send(data);
  } catch (error) {
    return next(error);
  }
};
