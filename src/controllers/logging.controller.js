import path from 'path';
import sf from 'slice-file';


export const logging = async (req, res) => {
    const resData = [];
    const filename = sf(path.join(basedir, 'access.log'));

    filename.sliceReverse().on('data', (data) => {
        resData.push(data.toString()); // convert from buffer to human readable
    }).on('end', () => {
        res.type('text/plain').send(resData.join(''));
    });
};

