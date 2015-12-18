/**
 * Created by chadsfather on 18/12/15.
 */

var redis = require('./../wrappers/rediswrapper').init();

module.exports = function () {
     return function (req, res, next) {
          redis.hgetall('idioms:es_ES', function (err, response) {
               if (err) throw err;

               req.idioms = response;

               next();
          });
     }
}
