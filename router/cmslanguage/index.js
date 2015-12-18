/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter) {
     expressrouter.get('/cmslanguage', function (req, res) {
          res.render('cmslanguage', {});
     });
};
