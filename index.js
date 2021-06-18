require('dotenv').config({
    path: 'config/.env'
});

const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {login, register} = require('./controllers/auth');
const bodyParser = require('body-parser');


const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.set('secretKey', 'nodeRestApi');
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.post('/login', login);
app.post('/register', register);


app.listen(3000, function() {
    console.log('Server listening on port 3000...');
});