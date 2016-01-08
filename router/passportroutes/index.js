/**
 * Created by ssanchez on 28/12/15.
 */
var passport = require('passport'),
    models = require('./../../models');

exports.init = function (expressrouter) {
     expressrouter.post(
          '/Autenticate',
          passport.authenticate('local'),
          function (req, res) {
               res.send(res.req.user);
          });

     expressrouter.post(
         '/Register',
         function (req, res, next) {
              models.model('User').register(
                  new models.model('User')({'username': req.body.username}),
                  req.body.password,
                  function (err) {
                       if (err) {
                            throw err;
                            return next(err);
                       }

                       console.log('==> REGISTRADO');
                  });
         });
};