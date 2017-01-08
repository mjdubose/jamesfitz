'use strict';
var Server = require('./frontend/server.js');
var express = require('express');
var path = require('path');
var app = Server.app();
var d3 = require('./apicalls/battlenet.js');
var db = require('./database/db.js');
var _ = require('underscore');
console.log('calling db.ensureSchema');
db.ensureSchema().catch(function (err) { console.log('err', err) });
module.exports = app;

app.use('/', express.static(path.join(__dirname, "../Public")));
// http://localhost:3000/profile?id=slayeneq-1864
app.route('/profile/')
    .get(function (req, res) {
        var id = req.query.id;
        if (id.indexOf('-') === -1 && id.indexOf('#') === -1) {
            res.sendStatus(404);
        }
        db.getprofile(id)
            .then(function (results) {
                if (Array.isArray(results) && results.length === 0) {
                    d3.getProfile(id).then(function (results) {
                        if (results.body.code === 'NOTFOUND') {
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
                              return  db.insertprofileindex(toBeSentBack.battleTag, hero).then(function(){
                                 return toBeSentBack.battleTag;
                              });                             
                            })
                            ).then(function (ArrayofBattleTags) {
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
                res.sendStatus(404);
            });
    });
//localhost:3000/character?charId=52519415&id=slayeneq-1864
app.route('/character')
    .get(function (req, res) {
        var charid = req.query.charId;
        var battleTag = req.query.id;
        return db.getCharacter(charid)
            .then(function (results) {
                if (Array.isArray(results) && results.length === 0) {
                    return d3.getCharacter(battleTag, charid)
                        .then(function (results) {
                            var results = results;
                            var items = results.body.items;

                            return db.insertCharacter(results.body.id, results.body.stats).then(function () {
                                var itemprops = [];
                                for (var prop in items) {
                                    itemprops.push(prop);
                                }
                                return Promise.all(itemprops.map(function (prop) {
                                    return db.insertItem(results.body.id, prop, results.body.items[prop]);
                                })).then(function () {
                                    return results;
                                });

                            }).then(function (results) {
                                var results = results;
                                var array = results.body.skills.active;
                                if (array.length > 0) {
                                    return Promise.all(array.map(function (skill) {
                                        if (skill.skill) {
                                            return db.insertSkill(results.body.id, skill.skill, 'active');
                                        }
                                        else {
                                            return true;
                                        }
                                    })).then(function () {
                                        return results;
                                    });
                                }
                                else {
                                    return results;
                                }
                            }).then(function (results) {
                                var results = results;
                                var array = results.body.skills.passive;
                                if (array.length > 0) {
                                    return Promise.all(array.map(function (skill) {
                                        if (skill.skill) {
                                            return db.insertSkill(results.body.id, skill.skill, 'passive');
                                        }
                                        else {
                                            return true;
                                        }
                                    })).then(function () {
                                        return results;
                                    });
                                }
                                else {
                                    return results;
                                }
                            }).then(function (results) {
                                return db.getCharacter(results.body.id)
                                    .then(function (results) {
                                        res.status(200).send(results);
                                    });
                            });
                        })
                }
                else {
                    res.status(200).send(results);
                }
            })
            .catch(function (err) {
                res.sendStatus(404);
            })
    });

//localhost:3000/character/skills?charId=52519415
app.route('/character/skills').get(function (req, res) {
    var id = req.query.charId;
    return db.getSkills(id).then(function (skills) {
        res.status(200).send(skills);
    }).catch(function (err) {
        res.sendStatus(404);
    })
});

//localhost:3000/character/item?charId=52519415&slot=feet
app.route('/character/item').get(function (req, res) {
    var id = req.query.charId;
    return db.getItems(id).then(function (items) {
        res.status(200).send(items);
    }).catch(function (err) {
        res.sendStatus(404);
    })

});
//localhost:3000/profile/delete?id=slayeneq-1864
app.route('/profile/delete').delete(function (req, res) {
    var id = req.query.id;
    return db.getprofile(id).then(function (results) {
        var results = results;
        return Promise.all(results.map(function (character) {
            var charid = character.characterID;
            console.log(charid);
            return db.destroyItems(charid).then(function () {
                return db.destroySkills(charid).then(function () {
                    return db.destroyCharacterStats(charid).then(function () {
                        return db.destroyProfile(id);
                    });
                });
            });

        })).then(function () {
            res.sendStatus(200);
        }).catch(function (err) {
            res.send(err);
        });

    });

});


const port = process.env.PORT ? process.env.PORT : (process.env.NODE_ENV === 'test' ? 4000 : 3000);
console.log('running on port', port);
app.listen(port);
//                                
//http://media.blizzard.com/d3/icons/items/large/unique_gloves_set_02_p2_demonhunter_male.png 
// icons are available for skills or items (items take large or small sizes, skills have pixel size allotments 21, 42 or 64);
//.png name is stored in items or skills database table under icon.