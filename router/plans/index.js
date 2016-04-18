/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/:lang/plans',
         function (req, res) {
              res.render('plans', {
                  'footer': 0
              });
         });
};