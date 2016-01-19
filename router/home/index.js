/**
 * Created by chadsfather on 15/12/15.
 */
var string = require('string');

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/',
         function (req, res) {
             var language = string(req.headers['accept-language']).left(2);

             res.redirect(301, '/' + language.s);
         });

     expressrouter.get(
         '/:lang',
         idioms(),
         function (req, res) {
             res.render('home', {
                 'idiom': req.idiom,
                 'idioms': req.idioms
             });
         });
};
