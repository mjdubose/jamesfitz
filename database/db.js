
var path = require('path');
console.log('database is running sqlite3');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./database/db.db"
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
                    table.integer('level');
                    table.integer('kills');
                    table.integer('paragonLevel');
                    table.integer('hardcore');
                    table.integer('seasonal');
                    table.integer('lastUpdated');
                    table.integer('dead');
                }).then(function () {
                    console.log('Created profile table');
                });
            }
        }), knex.schema.hasTable('stats').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('stats', function (table) {
                    table.increments('stat_id').primary();
                    table.integer('life');
                    table.integer('damage');
                    table.integer('toughness');
                    table.integer('healing');
                    table.float('attackSpeed');
                    table.integer('armor');
                    table.integer('strength');
                    table.integer('dexterity');
                    table.integer('vitality');
                    table.integer('intelligence');
                    table.integer('physicalResist');
                    table.integer('fireResist');
                    table.integer('coldResist');
                    table.integer('lightningResist');
                    table.integer('poisonResist');
                    table.integer('arcaneResist');
                    table.integer('critDamage');
                    table.integer('blockChance');
                    table.integer('blockAmountMin');
                    table.integer('blockAmountMax');
                    table.integer('damageIncrease');
                    table.float('critChance');
                    table.integer('damageReduction');
                    table.integer('thorns');
                    table.integer('lifeSteal');
                    table.integer('lifePerKill');
                    table.integer('goldFind');
                    table.integer('magicFind');
                    table.integer('lifeOnHit');
                    table.integer('primaryResource');
                    table.integer('secondaryResource');
                }).then(function () {
                    console.log('Created stats table');
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