const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Classification = require('../models/classification');
const Disease = require('../models/diseases');
const diseaseURL = 'https://automl.googleapis.com/v1beta1/projects/248027501302/locations/us-central1/models/ICN7501490648269193216:predict';
const classificationURL = 'https://automl.googleapis.com/v1beta1/projects/248027501302/locations/us-central1/models/ICN8228821988089528320:predict';
const access_token = 'ya29.c.Kp8BBAg8MoBUbWOZV9OsB0LrHB3VOpNXhAjnzm39QMQEmTcm_8BGodKFU7jww-EB2M38Y0jH6jaoOzox_OBpEU1sh2x6ajHV5VTpx65BQ_QpuFjpU3rOx_X0Qg-FLzY6TLSg31v2BUIm4WOiw8uzD74c-kFakNUkPEJbt3L3qHbKnI2Oc4aaTZFYD06LNrZRkktm5lDRfr_Igt6nXnDbBAr1';
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
      let plantObject = await Classification.findOne({
        raw: true,
        where: {
          plant_name: plant
        }
      });
      let diseaseObject = await Disease.findOne({
        raw: true,
        where: {
          disease_name: disease
        }
      });
      /*fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });*/
      res.render('plant_details', { plant: plantObject, disease: diseaseObject });
    }
  }
};
