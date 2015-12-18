/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/',
         function (req, res) {
              res.redirect(301, '/en');
         }
     );

     expressrouter.get(
         '/:lang',
         idioms(),
         function (req, res) {
              res.render('home', {
                   'idioms': req.idioms
              });
         });
};
