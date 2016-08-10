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

app.use('/', express.static(path.join(__dirname, "../Public")));
// http://localhost:3000/profile?id=slayeneq-1864
app.route('/profile/')
  .get(function (req, res) {
    var id = req.query.id;
    db.getprofile(id)
      .then(function (results) {
        console.log('results from db',results);

        if (Array.isArray(results)&&results.length === 0){
          d3.getProfile(id)
            .then(function (results) {
              console.log('results returned from blizzard',results);
              var toBeSentBack = {};
              var battleTag = results.body.battleTag;
              battleTag = battleTag.toLowerCase();
              battleTag = battleTag.replace("#","-");
              toBeSentBack.battleTag = battleTag;
              toBeSentBack.heroes = results.body.heroes;
                 return Promise.all(_.map(toBeSentBack.heroes, function (hero) {
                console.log('inside promise map',toBeSentBack.battleTag,'hero',hero.id);
                return db.insertprofileindex(toBeSentBack.battleTag, hero);
              })
              ).then(function (x) {
                console.log('tobesentback',toBeSentBack);
                console.log('x',x);
                res.status(200).send(toBeSentBack);
              })
            })
        } else {         
          res.status(200).send(results);
        }
      })

      .catch(function (err) {
        console.log(err.message);
        res.sendStatus(404);
      });
  });
app.route('/character')
  .get(function (req, res) {
    d3.getCharacter('slayeneq-1864', 3772318)
      .then(function (results) {
        res.status(200).send(results)
      })
      .catch(function (err) {
        console.log(err.message);
        res.sendStatus(404)
      })
  });


console.log('running on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);