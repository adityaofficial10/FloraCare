const fs = require('fs');
const path = require('path');
const axios = require('axios');
const diseaseURL = 'https://automl.googleapis.com/v1beta1/projects/248027501302/locations/us-central1/models/ICN7501490648269193216:predict';
const classificationURL = 'https://automl.googleapis.com/v1beta1/projects/248027501302/locations/us-central1/models/ICN8228821988089528320:predict';
const access_token = 'ya29.c.Kp8BBAinVL3ImRiPwkc7mzmIDXtBpCUIAmJFhGNtZIJQgbmP8HXwBqZg9jRAp7UjkN8DBVLh96cJaPiTzt_l2neXy8zcAGrmAZcPUuVldMBxGN7gThBx9Z7jlkYaLHZik57E1NFV03hHIvhXE02odSPzo0qi7BWnNwyFNkWbmx3GtC2anDLwjZAWa5oV6UXM1kxyFK-5G4DFRfSeyTSAc0Xl';

module.exports = {
  uploadAndGetPredictions: async function (req, res, next) {
    let file = req.file;
    console.log(file);
    if (!file)
      res.send('Please upload a file!');
    else {
      let headers = {
        'Authorization': `Bearer ${access_token}`
      };
      let imageString = fs.readFileSync(req.file.path, 'base64');
      let request = {
        payload: {
          image: {
            imageBytes: imageString
          }
        }
      };
      const res1 = await axios.post(classificationURL, request, { headers: headers }).catch((err) => {
        console.error(err.message);
      });
      const res2 = await axios.post(diseaseURL, request, { headers: headers }).catch((err) => {
        console.error(err.message);
      });
      let disease = '';
      let plant = '';
      if(res1) {
        console.log(res1.data);
        plant = res1.data.payload[0].displayName;
      }
      if(res2) {
        console.log(res2.data);
        disease = res2.data.payload[0].displayName;
      }
      /*fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });*/
      res.json(
        {message: 'Success', status: 200, plant: plant, disease: disease});
    }
  }
};