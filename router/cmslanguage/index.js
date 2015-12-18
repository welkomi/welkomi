/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (app) {
     app.get('/cmslanguage', function (req, res) {
          res.render('cmslanguage', {});
     });
};
