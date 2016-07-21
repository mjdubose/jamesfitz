//bnet.d3.profile.career({origin: 'us', tag: 'slayeneq-1864'}, callback);

var bnet = require('battlenet-api')('yn8yrwnakpvw4zg45u6xany4udcrt5w7');

var diablo3 = module.exports;

diablo3.getProfile = function (profile) {

    return new Promise(function (fulfill, reject) {
        bnet.d3.profile.career({ origin: 'us', tag: profile }, function (err, res, data) {
            if (err) {
                reject(err);
            }
            else {
                fulfill(data);
            }
        });

    })



}  