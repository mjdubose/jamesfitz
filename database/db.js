
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
        knex.schema.hasTable('profileindex').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('profileindex', function (table) {
                    table.increments('profile_id').primary();
                    table.string('battleTag', 50);
                    table.string('characterID', 50);
                    table.string('name', 50);
                    table.string('class', 20);
                    table.string('gender', 1);
                    table.number('level');
                    table.number('kills');
                    table.number('paragonLevel');
                    table.number('hardcore');
                    table.number('seasonal');
                    table.number('lastUpdated');
                    table.number('dead');
                }).then(function () {
                    console.log('Created profile table');
                });
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