/**
 * Created by ssanchez on 28/12/15.
 */
var passport = require('passport'),
    models = require('./../../models');

exports.init = function (expressrouter) {
     expressrouter.post(
          '/Autenticate',
          passport.authenticate('local', {
              failureRedirect: '/es/registerUser'
          }),
          function (req, res) {
               res.send(res.req.user);
          });

     expressrouter.post(
         '/Register',
         function (req, res, next) {
             console.log('REFERER', req.headers);

             models.model('User').register(
                 new models.model('User')({'username': req.body.username}),
                 req.body.password,
                 function (err) {
                     if (err) console.log(err);//return next(err);

                     console.log('==> REGISTRADO');
                 });
         });
};