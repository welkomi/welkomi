/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/:lang/add-plans',
         function (req, res) {
              res.render('addplans', {});
         });
};
