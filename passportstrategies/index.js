/**
 * Created by chadsfather on 28/12/15.
 */
var strategy = require('passport-http').BasicStrategy,
     modelos = require("./../modelos");

module.exports = function (req, res, next) {
    //  modelos.modelo('User').find({
    //       'user': 'chadsfather'
    //  })
    //       .exec(function (err, res) {
    //            if (err) throw err;
     //
    //            console.log('DEV');
    //            console.log(res);
    //       });
     /*new strategy(function (username, password, callback) {
          modelos.modelo('User')
               .find({
                    'user': 'chadsfather',
                    'password': '1715anni'
               })
               .exec(function (err, res) {
                    if(err) throw err;

                    console.log('deded');
                    console.log(res);
               })
     });*/
};
