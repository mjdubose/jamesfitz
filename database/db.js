
var path = require('path');
console.log('database is running sqlite3');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./db.db"
    },
    useNullAsDefault: true
});

module.exports = knex;

knex.ensureSchema = function () {
    return Promise.all([
        knex.schema.hasTable('movies').then(function (exists) {
            if (!exists) {
                // knex.schema.createTable('movies', function (table) {
                //     table.increments('movie_id').primary();
                //     table.string('genre', 50);
                //     table.string('actors', 300);
                //     table.string('title', 50);
                //     table.string('year', 6);
                //     table.string('rating', 15);
                // }).then(function () {
                //     console.log('Created movies table.');
                // });
            }
        })

    ]);
};


//close database connection
knex.closeDb = function () {
    knex.destroy().then(function () {
        console.log("Closed db connection");
    });
};