/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter) {
     expressrouter.get('/:lang/registeruser', function (req, res) {
          res.render('registeruser', {});
     });
};
