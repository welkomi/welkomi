/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/:lang/users',
         function (req, res) {
              res.render('users', {
                  'footer': 0
              });
         });
};