/**
 * The controller defined below is the estimator
 * controller with only on function (endpoint)
 * which returns estimated data
 *
 */
/* eslint-disable import/extensions, no-console */
import fs from 'fs';
import path from 'path';
import xml2 from 'xml2js';
import covid19ImpactEstimator from '../estimator.js';
/* eslint-disable import/extensions, no-console */

class EstimatorController {
  /**
   * This method outputs COVID-19 estimates using a response type
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  /* eslint-disable */
  static async estimator(req, res, next) {
    /* eslint-enable */
    try {
      const days = covid19ImpactEstimator(req.body);

      if (Object.keys(req.params).length !== 0 && req.params.responseType === 'xml') {
        const builder = new xml2.Builder({
          renderOpts: { pretty: true }
        });
        const xml = covid19ImpactEstimator(req.body);
        res.header('Content-Type', 'text/xml');
        return res.send(builder.buildObject(xml));
      }

      if (req.params.responseType === 'weeks') {
        const weeks = covid19ImpactEstimator(req.body);
        return res.status(200).json({
          weeks
        });
      }
      if (req.params.responseType === 'months') {
        const months = covid19ImpactEstimator(req.body);
        return res.status(200).json({
          months
        });
      }
      return res.status(200).json({
        days
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method outputs COVID-19 logs
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  /* eslint-disable */
  static async logs(req, res, next) {
    /* eslint-enable */
    try {
      /* eslint-disable no-undef, no-console */
      const basePath = __basedir;
      const filepath = path.join(basePath, 'access.log');

      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) throw err;

        res.header('Content-Type', 'text/plain');
        res.send(data);
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default EstimatorController;
