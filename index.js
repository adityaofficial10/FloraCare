require('dotenv').config({
    path: 'config/.env'
});

const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {login, register, authenticate, checkAuthenticated} = require('./controllers/auth');
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
      cb(null, 'plant.jpg');
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

app.get('/', function(req, res, next) {
    port.write('hello from node\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
    res.render('index');
});

app.get("/not-watered", function(req, res, next) {
    res.render("not-watered");
});

app.get('/login', checkAuthenticated,function(req, res, next) {
    res.render('login');
});
app.post('/login', login, function(req, res, next) {
    res.redirect('/main');
});

app.get('/main', authenticate, function(req, res, next) {
    res.render('main-page');
});

app.get('/register', function(req, res, next) {
    res.render('signup');
});
app.post('/register', register);

app.get('/journal', authenticate, function(req, res, next) {
    res.render('journal');
});

app.get('/journal/create', authenticate, function(req, res, next) {
    res.render('insertjournal');
});
app.post('/journal/create', authenticate, insertJournal, function(req, res, next) {
    res.redirect('/journal/getAll');
});
app.get('/journal/getAll', authenticate, getAllJournals);
app.get('/journal/get/:id', authenticate, getJournalById);
app.get('/plantDetails', authenticate, function(req, res, next){
    res.render('plant_classify');
});
app.post('/plantDetails', upload.single('myFile'), uploadAndGetPredictions);

app.listen(8080, function() {
    console.log('Server listening on port 3000...');
});
