const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const bodyParser = require('body-parser')



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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
app.use(bodyParser.json())
//allow axios to work
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

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

const createUser = (request, response) => {
  // const authenticate = 'SELECT email FROM Users WHERE email =' + [request.body.email]
  // if (result.rows.length > 0) {
  //   response.send('fuck u try again!')
  // } else{}
  console.log(request)
  const queryString = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';
  const values = [request.body.email, sha256(request.body.password)];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', result);

      let user_id = result.rows[0].id;

      response.sendStatus(200);

      // response.cookie('logged_in', 'true');
      // response.cookie('user_id', user_id);
      // // redirect to home page
      // response.redirect('http://localhost:3000/');
    }
  });
};

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/toilets', getToilets);
app.post('/users/create', createUser);


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