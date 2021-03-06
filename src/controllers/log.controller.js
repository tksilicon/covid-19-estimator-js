/**
 * The controller defined below is the log
 * controller with only on function (endpoint)
 * which returns logs
 *
 */
/* eslint-disable import/extensions, no-console */

import fs from 'fs';
import path from 'path';

class LogController {
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
      const filepath = path.join(basedir, 'logs/access.log');
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) throw err;
        res.status(200).type('text/plain').send(data);
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default LogController;
