const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM7', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

const WaterStatus = require('../models/status');

port.on("open", () => {
    console.log('serial port open');
});

parser.on('data', data => {
    console.log('got word from arduino:', data);
    let moisture = parseFloat(data);
    WaterStatus.create({
        username: "aditya10",
        water_status: "none",
        moisture_percentage: moisture,

    }).then(
        (statusObj) => {
            console.log(statusObj)
    }).catch((err) => {
        console.log(err)
    });

});

module.exports = {
    getWateringStatus: async function (req, res, next) {
        const data = req.body;
        let status = await WaterStatus.findOne({
            raw: true,
            where: {
                username: "aditya10"
            }
        });
        let moisture_percentage = status.moisture_percentage;
        if (moisture_percentage > 21.0) {
            res.render("watered");
        } else {
            res.render("not-watered");
        }
    }
};


