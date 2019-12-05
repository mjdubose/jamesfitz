//bnet.d3.profile.career({origin: 'us', tag: 'slayeneq-1864'}, callback);

 //const bnet = require('battlenet-api')('yn8yrwnakpvw4zg45u6xany4udcrt5w7');

const diablo3 = module.exports;

diablo3.getProfile =  (profile) => {

    return new Promise(function (fulfill, reject) {
    //    bnet.d3.profile.career({ origin: 'us', tag: profile }, function (err, res, data) {
        //    if (err) {
                reject(err);
       //     }
        //    else {
         //       fulfill(data);
     //       }
    //    });

    });
};

diablo3.getCharacter = (bnetTag,characterId) => {
    return new Promise(function(fulfill, reject) {
      //  bnet.d3.profile.hero({origin: 'us', tag: bnetTag, hero: characterId}, function(err,res,data) {
        //    if (err){
                reject(err)
      //      }
        //    else {
          //      fulfill(data)
         //   }
      //  })
    });
};