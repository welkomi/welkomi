/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter) {
     expressrouter.get(
         '/:lang/cmslanguagelogin',
         idioms(),
         function (req, res) {
              res.render('cmslanguagelogin', {});
         });

     expressrouter.get(
         '/:lang/cmslanguage',
         idioms(),
         function (req, res) {
              res.render('cmslanguage', {});
         });
};
