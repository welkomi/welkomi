/**
 * Created by irakli on 14/04/16.
 */

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/:lang/wkmessage',
         function (req, res) {
              res.render('wkmessage', {
                  'footer': 0
              });
         });
};