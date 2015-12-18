/**
 * Created by chadsfather on 15/12/15.
 */
var request = require('request');

exports.init = function (app) {
     app.get('/', function (req, res) {
          res.render('home', {
               'idioms': req.idioms
          });
     });
};
