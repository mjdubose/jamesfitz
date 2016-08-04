'use strict';
var Server = require('./frontend/server.js');
var express = require('express');
var path = require('path');
var app = Server.app();
var d3 = require('./apicalls/battlenet.js');
var db = require('./database/db.js');
db.ensureSchema();

app.use('/', express.static(path.join(__dirname, "../Public")));
app.route('/profile')
    .get(function (req, res) {
        d3.getProfile('slayeneq-1864')
            .then(function (results) {
  var toBeSentBack ={};
  toBeSentBack.battleTag = results.body.battleTag;
  toBeSentBack.heroes = results.body.heroes;
                res.status(200).send(toBeSentBack);
            })
            .catch(function (err) {
                console.log(err.message);
                res.sendStatus(404);
            });
    });
app.route('/character')
  .get(function(req, res) {
    d3.getCharacter('slayeneq-1864',3772318)
      .then(function(results){
        res.status(200).send(results)
      })
      .catch(function(err) {
        console.log(err.message);
        res.sendStatus(404)
      })
  })


console.log('running on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);