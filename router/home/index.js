/**
 * Created by chadsfather on 15/12/15.
 */
var string = require('string'),
    idioms = require('./../../idioms');

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/',
         function (req, res) {
             var language = string(req.headers['accept-language']).left(2);

             res.redirect(301, '/' + language.s);
         });

     expressrouter.get(
         '/:lang(en|es|de)',
         idioms(),
         function (req, res) {
             res.render('home', {
                 'locale': req.params.lang
             });
         });
};
