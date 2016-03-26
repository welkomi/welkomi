/**
 * Created by chadsfather on 18/12/15.
 */

/*var redis = require('./../wrappers/rediswrapper').init(),
    models = require('./../models/'),
    _ = require('underscore');*/

module.exports = function () {
     return function (req, res, next) {
         console.log(req.params.lang);

         req.setLocale(req.params.lang);

         next();
     }
};
