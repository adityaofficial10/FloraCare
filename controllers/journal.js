const journalModel = require('../models/plant');
const userModel = require('../models/user');

module.exports = {
    insertJournal: async function(req, res, next) {
        const data = req.body;
        let user = await userModel.findOne({
            where: {
                username: data.username
            }
        });
        let name = user.first_name + ' ' + user.last_name;
        journalModel.create({
            title: data.title,
            plant_title: data.plant_title,
            description: data.description,
            water_amount: data.water_amount,
            sunlight_needed: data.sunlight_needed,
            active_seasons: data.active_seasons,
            active_from: data.active_from,
            manure: data.manure,
            diseases: data.diseases,
            growing_method: data.growing_method,
            special_requirements: data.special_requirements,
            additional_info: data.additional_info,
            author_name: name,
            username: data.username
        }).then(
            (journal) => {
                res.json({message: 'Journal created!', status: 200, journal: journal});
        }).catch((err) => {
            res.send('There was a problem.');
            throw err;
        });
    },
    getAllJournals: async function(req, res, next) {
        let journals = journalModel.findAll();
        if(journals && journals.length) {
            res.json({message: 'Journals fetched!', status: 200, journals: journals});
        } else {
            res.send('there was a problem processing the request');
        }
    },
    getJournalById: async function(req, res, next) {
        let id = req.body.id;
        let journal = await journalModel.findOne({
            where: {
                plant_id: id
            }
        });
        if(journal)
          res.json({message: 'Journal fetched!', status: 200, journal: journal});
        else
          res.send('There was a problem');
    }
};