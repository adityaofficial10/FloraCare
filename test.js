const Classification = require('./models/classification');


Classification.findAll().then((ok) => {
    console.log(ok);
});