const jsonfile = require('jsonfile');
const FILE = 'toilets.json';

const pg = require('pg');
const config = {
	user: 'saywan',
	host: '127.0.0.1',
	database: 'project2',
	port: '5432'
};

const client = new pg.Client(config);

jsonfile.readFile(FILE, (fileReadError, obj)=>{

	if (fileReadError) {

		throw new Error('File read error' + fileReadError.message);

	} else {

		client.connect((dbConnectError) => {
	
			if (dbConnectError) {

				throw new Error('Connection error: ' + dbConnectError.message);

			} else {

				console.log('Connected to database.');

				let toilets = obj.toilets;
				let text = 'INSERT INTO toilets (name, location, time, ratings) ' + ' VALUES($1, $2, $3, $4) RETURNING *';
				let values = null;

				toilets.forEach((toilets) => {
					values = [toilets.name, toilets.location, toilets.time, toilets.ratings];
					
					client.query(text, values, (dbQueryError, result) => {
						if (dbQueryError) {

							throw new Error("Query error:", dbQueryError.message);

						} else {

							console.log("Entry added:", result.rows[0].id);

						}
						if (result.rows[0].id == 2) { client.end() };
					});
				});
			}
		});
	}
});