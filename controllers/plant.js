const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Classification = require('../models/classification');
const Disease = require('../models/diseases');
const diseaseURL = 'https://automl.googleapis.com/v1beta1/projects/248027501302/locations/us-central1/models/ICN7501490648269193216:predict';
const classificationURL = 'https://automl.googleapis.com/v1beta1/projects/248027501302/locations/us-central1/models/ICN8228821988089528320:predict';
const access_token = 'ya29.c.Kp8BBAicYFaosGxAMVkVmtzeRgq5Vo25Yjp7GwF2LE4c533BEIY6BiaCv26CDfMKGSM_2jE57C8lNkBPiVaQnDcbhLgna03MfNSoCb5A3NAKKmmA1Ita9G9M68Xl-fafYRyt7TijKt1ZVUvt85j482DtUUXyLWXOYzaE5scO5u0xJZqNCMeYHZ_MohkUvv92UtBvhV-q_lHL7pFmDic3gWxe';

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