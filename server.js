'use strict';
const Server = require('./frontend/server.js');
const express = require('express');
const path = require('path');
const app = Server.app();
const d3 = require('./apicalls/battlenet.js');
const db = require('./database/db.js');
const _ = require('underscore');
console.log('calling db.ensureSchema');
db.ensureSchema().catch(function (err) {
    console.log('err', err)
});
module.exports = app;

app.use('/', express.static(path.join(__dirname, "../Public")));
// http://localhost:3000/profile?id=slayeneq-1864
app.route('/profile/')
    .get(async (req, res) => {
        try {
            let id = req.query.id;
            if (id.indexOf('-') === -1 && id.indexOf('#') === -1) {
                res.sendStatus(404);
            }
            let results = await db.getprofile(id);

            if (Array.isArray(results) && results.length === 0) {
                results = await d3.getProfile(id);
                if (results.body.code === 'NOTFOUND') {
                    res.sendStatus(404);
                    return;
                }

                let toBeSentBack = {};
                let battleTag = results.body.battleTag;
                battleTag = battleTag.toLowerCase();
                battleTag = battleTag.replace("#", "-");
                toBeSentBack.battleTag = battleTag;
                toBeSentBack.heroes = results.body.heroes;
                let ArrayOfBattleTags = await Promise.all(_.map(toBeSentBack.heroes, async (hero) => {
                    await db.insertprofileindex(toBeSentBack.battleTag, hero);
                    return toBeSentBack.battleTag;
                }));

                let results = db.getprofile(ArrayOfBattleTags[0]);
                res.status(200).json(results);

            } else {
                res.status(200).json(results);
            }

        } catch (err) {
            res.sendStatus(404);
        }
    });
//localhost:3000/character?charId=52519415&id=slayeneq-1864
app.route('/character')
    .get(async (req, res) => {

        try {
            const charid = req.query.charId;
            const battleTag = req.query.id;
            let results = await db.getCharacter(charid);

            if (Array.isArray(results) && results.length === 0) {
                res.sendStatus(404);

                // results = await d3.getCharacter(battleTag, charid);
                // let cube = results.body.legendaryPowers.filter((item) => {
                //     return (item != null);
                // });
                //
                // let items = results.body.items;
                //
                // await db.insertCharacter(results.body.id, results.body.stats);
                // let itemprops = [];
                // for (let prop in items) {
                //     itemprops.push(prop);
                // }
                // await Promise.all(itemprops.map((prop) => {
                //     return db.insertItem(results.body.id, prop, results.body.items[prop]);
                // }));
                // await Promise.all(cube.map(function (element) {
                //     return db.insertCubeItem(results.body.id, element);
                // }));
                //
                //
                // let array = results.body.skills.active;
                // if (array.length > 0) {
                //     await Promise.all(array.map((skill) => {
                //         if (skill.skill) {
                //             return db.insertSkill(results.body.id, skill.skill, 'active');
                //         } else {
                //             return true;
                //         }
                //     }))
                // }
                //
                // array = results.body.skills.passive;
                // if (array.length > 0) {
                //     await Promise.all(array.map((skill) => {
                //         if (skill.skill) {
                //             return db.insertSkill(results.body.id, skill.skill, 'passive');
                //         } else {
                //             return true;
                //         }
                //     }));
                // }
                //
                // results = await db.getCharacter(results.body.id)
                // res.status(200).json(results);
            } else {
                res.status(200).json(results);
            }

        } catch (err) {
            res.sendStatus(404);
        }
    });
//localhost:3000/character/cube?charId=52519415
app.route('/character/cube').get(async (req, res) => {
    try {
        let id = req.query.charId;
   let cubeItems = await db.getCubeItems(id);
        console.log(cubeItems);
        res.status(200).json(cubeItems);
    } catch (err) {
            res.sendStatus(404);
        }
});

//localhost:3000/character/skills?charId=52519415
app.route('/character/skills').get(async (req, res) => {
    try {
        let id = req.query.charId;
        let skills = await db.getSkills(id);
        res.status(200).json(skills);
    } catch (err) {
        res.sendStatus(404);
    }
});

//localhost:3000/character/item?charId=52519415
app.route('/character/item').get(async (req, res) => {

    try {
        let id = req.query.charId;
        let items = await db.getItems(id);
        res.status(200).json(items);
    } catch (err) {
        res.sendStatus(404);
    }

});
//localhost:3000/profile/delete?id=slayeneq-1864
app.route('/profile/delete').delete(function (req, res) {
    // var id = req.query.id;
    // return db.getprofile(id).then(function (results) {
    //     return Promise.all(results.map(function (character) {
    //         var charid = character.characterID;
    //         return db.destroyItems(charid).then(function () {
    //             return db.destroySkills(charid).then(function () {
    //                 return db.destroyCharacterStats(charid).then(function () {
    //                     return db.destroyCubeItems(charid).then(function () {
    //                         return db.destroyProfile(id);
    //                     });
    //
    //                 });
    //             });
    //         });
    //
    //     })).then(function () {
    //         res.sendStatus(200);
    //     }).catch(function (err) {
    //         res.send(err);
    //     });
    //
    // });
               res.sendStatus(200);
});

const port = process.env.PORT ? process.env.PORT : (process.env.NODE_ENV === 'test' ? 4000 : 3000);
console.log('running on port', port);
app.listen(port);
//                                
//http://media.blizzard.com/d3/icons/items/large/unique_gloves_set_02_p2_demonhunter_male.png 
// icons are available for skills or items (items take large or small sizes, skills have pixel size allotments 21, 42 or 64);
//.png name is stored in items or skills database table under icon.