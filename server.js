// =============================================================================

let express    = require('express');   
let app        = express();           
let bodyParser = require('body-parser');
let mongoose   = require('mongoose');
let config     = require('./_config');

let morgan     = require('morgan');

let dburl = config.mongoURI[app.settings.env]; 

mongoose.connect(dburl, (err, res)=> {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

let port = 8000;       

// =============================================================================

                 
let router = express.Router();                  

require('./app/routes/api.js')(router);

// =============================================================================

app.use('/api', router);    

// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
