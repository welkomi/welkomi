/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter) {
     expressrouter.get(
         '/:lang/register-user',
         function (req, res) {
              res.render('registeruser', {});
         });

     expressrouter.get(
          '/:lang/login-user',
          function (req, res) {
               res.render('registeruser', {});
          });
};
