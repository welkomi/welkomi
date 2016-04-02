/**
 * Created by ssanchez on 28/12/15.
 */
var passport = require('passport'),
    models = require('./../../models'),
    password = require('password-hash-and-salt');

exports.init = function (expressrouter) {
    /**
     * Login User
     */
    expressrouter.post(
        '/autenticate/',
        passport.authenticate('local', {
          'failureRedirect': '/es/registrar-usuario/'
        }), function (err, res) {
            res.redirect('/');
        });

    /**
     * Login User by AJAX
     */
    expressrouter.post(
        '/authenticate-ajax/',
        function (req, res, next) {
            var user = req.body;

            if (user.logintype === 'fb') {
                user.password = user.username;
            }

            passport.authenticate('local', function (err, user) {
                if (err) res.json(err);

                req.login(user, {}, function (errLogin, resLogin) {
                    if (errLogin) res.json(errLogin);

                    res.json({'success': true});
                });
            })(req, res, next)
        });

    /**
     * Logout User
     */
    expressrouter.get(
        '/logout/',
        function (req, res) {
            req.logout();
            res.redirect('/');
        });

    /**
     * Register User
     */
     expressrouter.post(
         '/register/',
         function (req, res, next) {
             var user = req.body,
                 User = models.model('User');
             User
                 .find({
                     'username': req.body.username
                 })
                 .select('-password')
                 .exec(function (errFind, resFind) {
                     if (errFind) throw errFind;

                     if (resFind.length > 0) {
                         res.json(resFind[0]);
                     }

                     else {
                         password(user.password).hash(function (errHash, resHash) {
                             if (errHash) throw errHash;

                             user.password = resHash;

                             User
                                 .create(user, function (errCreate, resCreate) {
                                     if (errCreate) throw errCreate;

                                     User
                                         .find(resCreate)
                                         .select('-password')
                                         .exec(function (errCreateFind, resCreateFind) {
                                             if (errCreateFind) throw errCreateFind;

                                             res.json(resCreateFind);
                                         });
                             });
                         });
                     }
                 });
         });
};