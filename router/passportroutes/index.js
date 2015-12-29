/**
 * Created by ssanchez on 28/12/15.
 */
var passport = require('passport');

exports.init = function (expressrouter) {
     expressrouter.get(
          '/cmsAutenticate',
          passport.authenticate('basic', { session: false }),
          function (req, res) {
               res.send(res);
          });
};