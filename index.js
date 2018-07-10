const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');



// Initialise postgres client
const config = {
  user: 'saywan',
  host: '127.0.0.1',
  database: 'project2',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//allow axios to work
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

//  const homePage = (request, response) => {
//   // query database for all toilets

//   const queryString = 'SELECT * from toilets;';

//   pool.query(queryString, (err, result) => {
//     if (err) {
//       console.error('Query error:', err.stack);
//     } else {

//       // redirect to home page
//       response.render('home');

//     }
//   });
// }

//  const getResults = (request, response) => {
//   // query database for all toilets

//   const queryString = 'SELECT * from toilets;';
//   pool.query(queryString, (err, result) => {
//     if (err) {
//       console.error('Query error:', err.stack);
//     } else {

//       // redirect to results page
//       response.render('results',{toilets: result.rows});

//     }
//   });
// }

//Get nearby toilets here
const getToilets = (request, response) => {
  var currentLat = request.query.Latitude;
  currentLat = parseFloat(currentLat).toFixed(8);
  console.log(currentLat);
  var currentLng = request.query.Longitude;
  currentLng = parseFloat(currentLng).toFixed(8);
  console.log(currentLng);


  const queryString = 'SELECT id, name, location, time, ratings from toilets ORDER BY SQRT(POWER('+ currentLat +' - lat, 2) + POWER('+ currentLng +' - lng, 2))';

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      // send as JSON
      response.json(result);
    }
  });
}


/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/', homePage);
app.get('/toilets', getToilets);
// app.get('/results', getResults);



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const server = app.listen(3001, () => console.log('~~~ Ahoy we go from the port of 3001!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);