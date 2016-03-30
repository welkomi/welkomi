/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, i18n) {
     expressrouter.get(
         ___availableLangs.route + '/register-user/',
         function (req, res) {
              res.render('registeruser', {});
         });

     expressrouter.get(
         ___availableLangs.route + i18n.__('/login-user/'),
         function (req, res) {
             res.render('registeruser', {});
         });
};
