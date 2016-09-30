
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
                    table.increments('id').primary();
                    table.integer('stat_id');
                    table.integer('life');
                    table.integer('damage');
                    table.integer('toughness');
                    table.integer('healing');
                    table.float('attackSpeed');//
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
                    table.float('blockChance');
                    table.integer('blockAmountMin');
                    table.integer('blockAmountMax');
                    table.integer('damageIncrease');
                    table.float('critChance');
                    table.float('damageReduction');
                    table.integer('thorns');
                    table.integer('lifeSteal');
                    table.integer('lifePerKill');
                    table.float('goldFind');
                    table.float('magicFind');
                    table.integer('lifeOnHit');
                    table.integer('primaryResource');
                    table.integer('secondaryResource');
                }).then(function () {
                    console.log('Created stats table');
                });
            }
        }),
        knex.schema.hasTable('items').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('items', function (table) {
                    table.increments('id').primary();
                    table.string('item_id', 30);
                    table.integer('characterID');
                    table.string('name', 30);
                    table.string('icon', 50);
                    table.string('displayColor', 10);
                    table.string('tooltipParams', 250);
                    table.string('slot', 10);
                }).then(function () {
                    console.log('Created items table');
                });
            }
        }),
        knex.schema.hasTable('setitemsequipped').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('setitemsequipped', function (table) {
                    table.increments('id').primary();
                    table.string('chest', 30);
                    table.string('pants', 30);
                    table.string('shoulder', 30);
                    table.string('helm', 30);
                    table.string('gloves', 30);
                    table.string('boots', 30);
                }).then(function () {
                    console.log('Created setitemsequipped table');
                });
            }
        }),
        knex.schema.hasTable('skills').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('skills', function (table) {
                    table.increments('id').primary();
                    table.string('slug', 30);
                    table.integer('CharacterId');
                    table.string('name', 30);
                    table.string('icon', 30);
                    table.integer('level');
                    table.string('categorySlug', 30);
                    table.string('tooltipUrl', 30);
                    table.string('description', 255);
                    table.string('simpleDescription', 255);
                    table.string('skillCalcId', 1);
                    table.string('state', 8);
                }).then(function () {
                    console.log('Created skills table');
                });
            }
        }),
        knex.schema.hasTable('runes').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('runes', function (table) {
                    table.increments('id').primary();
                    table.string('slug', 30);
                    table.string('type', 30);
                    table.string('name', 30);
                    table.string('level', 30);
                    table.string('description', 250);
                    table.string('simpleDescription', 250);
                    table.string('tooltipParams', 250);
                    table.string('skillCalcId', 1);
                    table.integer('order');
                 
                }).then(function () {
                    console.log('Created runes table');
                });
            }
        }),
    ])
};
knex.insertSkill = function (id, skill, state) {
    return knex('skills').insert({
        'slug': skill.slug,
        'CharacterId': id,
        'name': skill.name,
        'icon': skill.icon,
        'level': skill.level,
        'categorySlug': skill.categorySlug,
        'tooltipUrl': skill.tooltipUrl,
        'description': skill.description,
        'simpleDescription': skill.simpleDescription,
        'skillCalcId': skill.skillCalcId,
        'state': state
    }).then(function (skill) {
        return skill;
    })
};

knex.getSkills = function (id) {
    return knex('skills').where({ CharacterId: id }).select();
};

knex.getCharacter = function (id) {
    return knex('stats').where({ stat_id: id }).select();
};

knex.insertCharacter = function (id, character) {
    return knex('stats').insert({
        "stat_id": id,
        "life": character.life,
        "damage": character.damage,
        "toughness": character.toughness,
        "healing": character.healing,
        "attackSpeed": character.attackSpeed,
        "armor": character.armor,
        "strength": character.strength,
        "dexterity": character.dexterity,
        "vitality": character.vitality,
        "intelligence": character.intelligence,
        "physicalResist": character.physicalResist,
        "fireResist": character.fireResist,
        "coldResist": character.coldResist,
        "lightningResist": character.lightningResist,
        "poisonResist": character.poisonResist,
        "arcaneResist": character.arcaneResist,
        "critDamage": character.critDamage,
        "blockChance": character.blockChance,
        "blockAmountMin": character.blockAmountMin,
        "blockAmountMax": character.blockAmountMax,
        "damageIncrease": character.damageIncrease,
        "critChance": character.critChance,
        "damageReduction": character.damageReduction,
        "thorns": character.thorns,
        "lifeSteal": character.lifeSteal,
        "lifePerKill": character.lifePerKill,
        "goldFind": character.goldFind,
        "magicFind": character.magicFind,
        "lifeOnHit": character.lifeOnHit,
        "primaryResource": character.primaryResource,
        "secondaryResource": character.secondaryResource
    }).then(function (results) {
        return results;
    }).catch(function (err) {
        console.log(err.message);
    });
};

knex.getprofile = function (profilename) {
  
    return knex('profileindex').where({ battleTag: profilename }).select();
};

knex.insertprofileindex = function (battletag, herotobeadded) {
   if (!Date.now){
       Date.now = function(){return new Date().getTime();}
   }
   var time = Math.floor(Date.now() / 1000);
    return knex('profileindex').insert({
        'battleTag': battletag,
        'characterID': herotobeadded.id,
        'name': herotobeadded.name,
        'class': herotobeadded.class,
        'gender': herotobeadded.gender.toString(),
        'level': herotobeadded.level,
        'kills': herotobeadded.kills,
        'paragonLevel': herotobeadded.paragonLevel,
        'hardcore': herotobeadded.hardcore,
        'seasonal': herotobeadded.seasonal,
        'lastUpdated': time,
        'dead': herotobeadded.dead
    }).then(function (item) {
        return item;
    })
        .catch(function (err) {
            console.log(err.message);
        });
};

knex.insertItem = function (charId, slot, item) {
    console.log('charID', charId, 'Slot', slot, 'item', item);
    return knex('items').insert({
        'item_id': item.id,
        'characterID': charId,
        'name': item.name,
        'icon': item.icon,
        'displayColor': item.displayColor,
        'tooltipParams': item.tooltipParams,
        'slot': slot
    }).then(function (item) {
        return item;
    }).catch(function (err) {
        console.log(err.message);
    });
};

knex.getItem = function (charId, slot) {
    return knex('items').where({ characterId: charId, slot: slot }).select();
};

//close database connection
knex.closeDb = function () {
    knex.destroy().then(function () {
        console.log("Closed db connection");
    });
};