const path = require('path');
const sf = require('slice-file');

module.exports = {
    async logging (req, res) {
        const resData = [];
        const filename = sf(path.join(__dirname, '../db/access.log'));
    
        filename.sliceReverse().on('data', (data) => {
          resData.push(data.toString()); // convert from buffer to human readable
        }).on('end', () => {
          res.type('text/plain').send(resData.join(''));
        });
      }
};