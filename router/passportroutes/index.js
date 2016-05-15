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
                user.password = user.logintype + user.email + user.logintype;
            }

            passport.authenticate('local', function (err, user) {
                if (err) throw (err);

                req.login(user, {}, function (errLogin, resLogin) {
                    if (errLogin) throw (errLogin);

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
                         console.log('USUARIO ENCONTRADO');
                         res.json(resFind[0]);
                     }

                     else {
                         if (user.logintype === 'fb') {
                             user.password = user.logintype + user.email + user.logintype;
                         }

                         password(user.password).hash(function (errHash, resHash) {
                             if (errHash) throw errHash;

                             user.password = resHash;

                             User
                                 .create(user, function (errCreate, resCreate) {
                                     if (errCreate) throw errCreate;

                                     var resource = {
                                             'mimeType': 'application/vnd.google-apps.folder',
                                             'name': user.username,
                                             'parents': ['0B9gI2Lt4M_dxcEM0NEI1NU5fdkU']
                                         },
                                         fields = 'id, webViewLink';

                                     require('./../../wrappers/googlewrapper')
                                         .api('drive', 'v3', function (drive) {
                                             drive.files.create({
                                                 'resource': resource,
                                                 'fields': fields
                                             }, function (errDrive, resDrive) {
                                                 if (errDrive) throw errDrive;

                                                 resource.name = 'routes';
                                                 resource.parents = [resDrive.id];

                                                 drive.files.create({
                                                     'resource': resource,
                                                     'fields': fields
                                                 }, function (errDrive2, resDrive2) {
                                                     if (errDrive2) throw errDrive2;

                                                     User
                                                         .update({
                                                             'username': user.username
                                                         },
                                                         {
                                                             '$set': {
                                                                 'userfolder': resDrive.id,
                                                                 'routesfolder': resDrive2.id
                                                             }
                                                         }, function (errUpdate, resUpdate) {
                                                             if (errUpdate) throw errUpdate;

                                                             User
                                                                 .find({
                                                                     'username': user.username
                                                                 })
                                                                 .select('-password')
                                                                 .exec(function (errCreateFind, resCreateFind) {
                                                                     if (errCreateFind) throw errCreateFind;

                                                                     res.json(resCreateFind);
                                                                 });
                                                         });
                                                 });
                                             });
                                         });
                                 });
                         });
                     }
                 });
         });
};