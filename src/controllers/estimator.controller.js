/**
 * The controller defined below is the estimator
 * controller with only on function (endpoint)
 * which returns estimated data
 *
 */
/* eslint-disable import/extensions, no-console */
import path from 'path';
import xml2 from 'xml2js';
import sf from 'slice-file';
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
      return res.status(200).json({
        days
      });
    } catch (error) {
      return next(error);
    }
  }
  /**
  * This method outputs COVID-19 estimates using a response type
  * @param {*} req
  * @param {*} res
  * @param {*} next
  */
  /* eslint-disable */
  static async estimatorXml(req, res, next) {
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

      const resData = [];
      const file = sf(filepath);

      file.sliceReverse().on('data', (data) => {
        resData.push(data.toString()); // convert from buffer to human readable
      }).on('end', () => {
        res.type('text/plain').send(resData.join(''));
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default EstimatorController;
