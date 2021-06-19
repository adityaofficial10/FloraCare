require('dotenv').config({
    path: 'config/.env'
});

const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {login, register, authenticate} = require('./controllers/auth');
const {insertJournal, getAllJournals, getJournalById} = require('./controllers/journal');
const {uploadAndGetPredictions} = require('./controllers/plant');
const bodyParser = require('body-parser');
const multer = require('multer');


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

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
    onFileUploadStart: function (file) {
        console.log(file.fieldname + ' is starting ...')
    },
    onFileUploadData: function (file, data) {
        console.log(data.length + ' of ' + file.fieldname + ' arrived')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }

});
   
let upload = multer({ storage: storage })

app.post('/login', login);
app.post('/register', register);
app.post('/journal/create', authenticate, insertJournal);
app.get('/journal/getAll', authenticate, getAllJournals);
app.post('/journal/get', authenticate, getJournalById);
app.post('/plantDetails', upload.single('myFile'), uploadAndGetPredictions);


app.listen(3000, function() {
    console.log('Server listening on port 3000...');
});