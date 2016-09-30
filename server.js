'use strict';
var Server = require('./frontend/server.js');
var express = require('express');
var path = require('path');
var app = Server.app();
var d3 = require('./apicalls/battlenet.js');
var db = require('./database/db.js');
var _ = require('underscore');
console.log('calling db.ensureSchema');
db.ensureSchema();
module.exports = Server.app();

app.use('/', express.static(path.join(__dirname, "../Public")));
// http://localhost:3000/profile?id=slayeneq-1864
app.route('/profile/')
  .get(function (req, res) {
    var id = req.query.id;
    db.getprofile(id)
      .then(function (results) {
      //  console.log('results from db', results);

        if (Array.isArray(results) && results.length === 0) {
          d3.getProfile(id).then(function(results){
            if (results.body.code==='NOTFOUND'){
                 res.sendStatus(404);            
            }
       return results;
          }) 
            .then(function (results) {          
              var toBeSentBack = {};
              var battleTag = results.body.battleTag;
              battleTag = battleTag.toLowerCase();
              battleTag = battleTag.replace("#", "-");
              toBeSentBack.battleTag = battleTag;
              toBeSentBack.heroes = results.body.heroes;
              return Promise.all(_.map(toBeSentBack.heroes, function (hero) {
                db.insertprofileindex(toBeSentBack.battleTag, hero);
                return toBeSentBack.battleTag;            
              })
              ).then(function (ArrayofBattleTags) {
             //   console.log('BattleTag', ArrayofBattleTags[0]);
                return db.getprofile(ArrayofBattleTags[0]).then(function (results) {
                  res.status(200).send(results);
                })

              })
            })
        } else {
          res.status(200).send(results);
        }
      })

      .catch(function (err) {
       // console.log(err.message);
        res.sendStatus(404);
      });
  });
//localhost:3000/character?charId=52519415&id=slayeneq-1864
app.route('/character')
  .get(function (req, res) {
    var charid = req.query.charId;
    var battleTag = req.query.id;
    db.getCharacter(charid)
      .then(function (results) {
        if (Array.isArray(results) && results.length === 0) {
          d3.getCharacter(battleTag, charid)
            .then(function (results) {
              db.insertCharacter(results.body.id, results.body.stats);
              db.insertItem(results.body.id, 'head', results.body.items.head);
              db.insertItem(results.body.id, 'torso', results.body.items.torso);
              db.insertItem(results.body.id, 'feet', results.body.items.feet);
              db.insertItem(results.body.id, 'hands', results.body.items.hands);
              db.insertItem(results.body.id, 'legs', results.body.items.legs);
              db.insertItem(results.body.id, 'bracers', results.body.items.bracers);
              db.insertItem(results.body.id, 'mainHand', results.body.items.mainHand);
              db.insertItem(results.body.id, 'waist', results.body.items.waist);
              db.insertItem(results.body.id, 'rightFinger', results.body.items.rightFinger);
              db.insertItem(results.body.id, 'leftFinger', results.body.items.leftFinger);
              console.log(results.body.skills.active);
              var array = results.body.skills.active;
              array.map(function(skill){
                db.insertSkill(results.body.id,skill.skill,'active');
              });
                 array = results.body.skills.passive;
              array.map(function(skill){
                db.insertSkill(results.body.id,skill.skill,'passive');
              });
              return results.body.id;
            })
            .then(function (id) {
              return db.getCharacter(id)
                .then(function (results) {
                  res.status(200).send(results);
                })
            })

        } else {
          res.status(200).send(results);
        }
      }
      ).catch(function (err) {
        console.log(err.message);
        res.sendStatus(404);
      })
  });
//localhost:3000/character/item?CharId=52519415&slot=boot
  app.route('/character/item').get(function(req,res){
     var id = req.query.CharId;
     var slot = req.query.slot;
   return  db.getItem(id,slot).then(function(item){
res.status(200).send(item[0]);
   }).catch(function(err){ 
    res.sendStatus(404)});
  });

console.log('running on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
//                                
//http://media.blizzard.com/d3/icons/items/large/unique_gloves_set_02_p2_demonhunter_male.png 
// icons are available for skills or items (items take large or small sizes, skills have pixel size allotments 21, 42 or 64);
//.png name is stored in items or skills database table under icon.