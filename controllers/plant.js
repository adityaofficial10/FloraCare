const fs = require('fs');
const path = require('path');

module.exports = {
    uploadAndGetPredictions: async function(req, res, next) {
        let file = req.file;
        console.log(file);
        if(!file) 
          res.send('Please upload a file!');
        else {
            let directory = __dirname.split('/controllers')[0] + '/uploads';
            fs.readdir(directory, (err, files) => {
                if (err) throw err;
              
                for (const file of files) {
                  fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                  });
                }
            });
            res.send('Success');
        }
    }
};