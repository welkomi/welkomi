/**
 * Created by chadsfather on 18/12/15.
 */

var redis = require('./../wrappers/rediswrapper').init();

module.exports = function () {
     return function (req, res, next) {
          var idiom = req.params.lang || 'en';

          redis.hgetall(
              'language:' + idiom,
              function (err, response) {
                   if (err) throw err;

                   req.idioms = response;

                   next();
              });
     }
};
