/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, idioms) {
     expressrouter.get(
         '/:lang/cms-language',
         idioms.init(),
         function (req, res) {
              res.render('cmslanguage', {});
         });
};
