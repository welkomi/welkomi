/**
 * Created by ssanchez on 28/12/15.
 */
var passport = require('passport'),
    models = require('./../../models'),
    password = require('password-hash-and-salt');

exports.init = function (expressrouter) {
     expressrouter.post(
          '/autenticate/',
          passport.authenticate('local', {
              'failureRedirect': '/es/registerUser'
          }),
          function (req, res) {
               res.send(res.req.user);
          });

     expressrouter.post(
         '/register/',
         function (req, res, next) {
             var user = req.body,
                 User = models.model('User');

             console.log('incominig register', user);
             console.log('-->', user.username);

             User
                 .find({
                     'username': req.body.username
                 })
                 .exec(function (errFind, resFind) {
                     if (errFind) throw errFind;

                     if (resFind.length > 0) {
                         console.log('User found', resFind);
                         res.json(resFind);
                     }

                     else {
                         password(user.password).hash(function (errHash, resHash) {
                             if (errHash) throw errHash;

                             user.password = resHash;

                             User.create(req.body, function (errCreate, resCreate) {
                                 if (errCreate) throw errCreate;

                                 console.log('User create', resCreate);
                                 res.json(resCreate);
                             });
                         });
                     }
                 });

             //models.model('User').register(
             //    new models.model('User')(
             //        {
             //            'username': req.body.username
             //        }
             //    ),
             //    req.body.password,
             //    function (err) {
             //        if (err) throw err;
             //
             //        console.log('==> REGISTRADO');
             //    });
         });
};