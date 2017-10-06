var path = require('path');
var pg =require('pg');
var config = require('../config.js');
console.log(config.configuration());
var knex = require('knex')(config.configuration());

module.exports = knex;

knex.ensureSchema = function () {
//     if (!config.pool || (config.pool && config.pool.max !== 0)) {
//   this.initializePool(config);
// }
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
                    table.double('stat_id');
                    table.double('life');
                    table.double('damage');
                    table.double('toughness');
                    table.double('healing');
                    table.float('attackSpeed');//
                    table.double('armor');
                    table.double('strength');
                    table.double('dexterity');
                    table.double('vitality');
                    table.double('intelligence');
                    table.double('physicalResist');
                    table.double('fireResist');
                    table.double('coldResist');
                    table.double('lightningResist');
                    table.double('poisonResist');
                    table.double('arcaneResist');
                    table.double('critDamage');
                    table.float('blockChance');
                    table.double('blockAmountMin');
                    table.double('blockAmountMax');
                    table.double('damageIncrease');
                    table.float('critChance');
                    table.float('damageReduction');
                    table.double('thorns');
                    table.double('lifeSteal');
                    table.double('lifePerKill');
                    table.float('goldFind');
                    table.float('magicFind');
                    table.double('lifeOnHit');
                    table.double('primaryResource');
                    table.double('secondaryResource');
                }).then(function () {
                    console.log('Created stats table');
                });
            }
        }),

        knex.schema.hasTable('items').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('items', function (table) {
                    table.increments('id').primary();
                    table.string('item_id', 50);
                    table.integer('characterID');
                    table.string('name', 50);
                    table.string('icon', 50);
                    table.string('displayColor', 10);
                    table.string('tooltipParams', 400);
                    table.string('slot', 13);
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
                    table.string('slug', 100);
                    table.integer('CharacterId');
                    table.string('name', 100);
                    table.string('icon', 100);
                    table.integer('level');
                    table.string('categorySlug', 100);
                    table.string('tooltipUrl', 100);
                    table.string('description', 400);
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
        })
    ]),
        knex.schema.hasTable('cube').then(function(exists){
            if (!exists){
          knex.schema.createTable('cube', function (table) {
                    table.increments('id').primary();
                    table.integer('charId');
                    table.string('item_id', 50);
                    table.string('name', 50);
                    table.string('icon', 50);
                    table.string('displayColor', 10);
                    table.string('tooltipParams', 400);        
                }).then(function () {
                    console.log('Created cube table');
                });
            }
        })
};
knex.insertSkill = function (id, skill, state) {
         return knex('skills').insert({
             'slug': skill.slug ,
             'CharacterId': id,
             'name': skill.name ,
             'icon': skill.icon ,
             'level': skill.level ,
             'categorySlug': skill.categorySlug ,
             'tooltipUrl': skill.tooltipUrl ,
             'description': skill.description ,
             'simpleDescription': skill.simpleDescription,
             'skillCalcId': skill.skillCalcId ,
             'state': state
         }).then(function (result) {        
             return result;
         });

};

knex.getSkills = function (id) {
    return knex('skills').where({ CharacterId: id }).select();
};

knex.getCharacter = function (id) {
    return knex('stats').where({ stat_id: id }).select();
};

knex.insertCubeItem = function(id, item){
    return knex('cube').insert({
     'charId': id,
     'item_id':item.id,
     'name': item.name,
     'icon': item.icon,
     'displayColor': item.displayColor,
     'tooltipParams': item.tooltipParams
    }).catch(function (err) {
        console.log(err.message);
    });
}

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
        'kills': herotobeadded.kills.elites,
        'paragonLevel': herotobeadded.paragonLevel,
        'hardcore': herotobeadded.hardcore ? 1 : 0,
        'seasonal':  herotobeadded.seasonal  ? 1 : 0,
        'lastUpdated': time,
        'dead': herotobeadded.dead  ? 1 : 0
    }).catch(function (err) {
            console.log(err.message);
        });
};

knex.insertItem = function (charId, slot, item) {
 
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

knex.getItems = function (charId) {
    return knex('items').where({ characterID: charId}).select();
};

knex.getCubeItems = function(charId){
    console.log(charId);
  return knex('cube').where({charId: charId}).select();
};

knex.destroyItems = function(charId){
    return knex('items').where({characterID: charId}).del();
};

knex.destroyCharacterStats = function(charId){
    return knex('stats').where({stat_id : charId}).del();
};

knex.destroySkills = function(charId){
     return knex('skills').where({CharacterId: charId}).del();
};

knex.destroyCubeItems = function(charId){
      return knex('cube').where({charId : charId}).del();
}

knex.destroyProfile = function(id){
    return knex('profileindex').where({battleTag: id}).del();
};

//close database connection
knex.closeDb = function () {
    knex.destroy().then(function () {
        console.log("Closed db connection");
    });
};