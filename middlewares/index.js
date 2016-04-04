/**
 * Created by chadsfather on 17/12/15.
 */

var __model;

function getUsermodel () {
    if (__model) {
        return __model;
    }

    return require('./../models').model('User');
}

/**
 * Return the translate word of the keys
 *
 * @returns {Function}
 */
exports.renderGdriveUrl = function () {
    return function (req, res, next) {
        res.locals.renderGdriveUrl = function (folder, file) {
            return process.env.GDRIVE_URI + folder + '/' + file;
        };

        next();
    }
};

/**
 * Return prefixer for cascade routing
 *
 * @param object
 * @param express
 * @returns {Function}
 */
exports.prefixRouter = function (object, express) {
    return function (path, configure) {
        var idioms = require('./../idioms'),
            router = express.Router();

        object.use (path, idioms.init(), router);

        configure(router);

        return router;
    }
};

/**
 * Return a valida url for the site
 *
 * @returns {Function}
 */
exports.renderUrl = function () {
    return function (req, res, next) {
        res.locals.renderUrl = function (route) {
            var locale = req.res.locale;

            return '/' + locale + __(route);
        };

        next();
    };
};

/**
 * Passport principal strategy
 *
 * @param LocalStrategy
 * @returns {*}
 */

exports.passportUse = function (LocalStrategy) {
    var __password = require('password-hash-and-salt');

    return new LocalStrategy({
        'session': true
    }, function (username, password, cb) {
        getUsermodel()
            .find({
                'username': username
            })
            .exec(function (errFindUser, resFindUser) {
                if (errFindUser) return cb(errFindUser);

                if (resFindUser.length === 0) {
                    return cb(null, false);
                }

                var User = resFindUser[0];

                __password(password).verifyAgainst(User.password, function (errVerify, resVerify) {
                    if (errVerify) return cb(errVerify);

                    if (!resVerify) return cb(false);

                    return cb(null, User);
                })
            })
    });
};

/**
 * Passport user serialize
 *
 * @returns {Function}
 */
exports.serializeUser = function () {
    return function (user, cb) {
        cb(null, user._id);
    }
};

/**
 * Passport user deserailizer
 *
 * @returns {Function}
 */
exports.deserializeUser = function () {
    return function (id, cb) {
        getUsermodel()
            .find({
                '_id': id
            })
            .select('-password')
            .select('-role')
            .select('-_id')
            .select('-__v')
            .select('-logintype')
            .exec(function (err, res) {
                if (err) return cb(err);

                cb(null, res[0]);
            })
    }
};

/**
 * Crea un objeto de usuario
 *
 * @returns {Function}
 */
exports.userObject = function () {
    return function (req, res, next) {
        res.locals.userObject = function () {
            var userinf = req.user
                ? JSON.stringify(req.user)
                : false;

            return '<script> window.__user__ = ' + userinf + '</script>';
        };

        next();
    }
};

/**
 * Setea el id de la app de FB
 *
 * @returns {Function}
 */
exports.setFBId = function () {
    return function (req, res, next) {
        res.locals.setFBId = function () {
            return '<script> window.FBID = ' + process.env.FACEBOOK_API_ID + ';</script>';
        };

        next();
    }
};

/**
 * Obtiene una imagen en random para la portada de la home
 *
 * @returns {Function}
 */
exports.getRandomImgForHome = function () {
    var key = '___imagerandomhome',
        redis = require('./../wrappers/rediswrapper').init(),
        parentFolder = '0B9gI2Lt4M_dxNGJxMnlIN1dQRzg';

    function __getRandom (files) {
        var randomNumber = (Math.floor(Math.random() * files.length) + 1) - 1;

        return files[randomNumber].name;
    }

    function __resLocals (resRedis, next, res) {
        if (typeof resRedis === 'string') {
            resRedis = JSON.parse(resRedis);
        }
        var files = resRedis.files;

        res.locals.getRandomImgForHome = function () {
            return '<style>.hero {background-image: url(' + process.env.GDRIVE_URI + parentFolder + '/' + __getRandom(files) + ') !important};</style>';
        };

        next();
    }

    return function (req, res, next) {
        redis.exists(key, function (errRedis, resRedis) {
            if (errRedis) throw  errRedis;

            if (!resRedis) {
                var google = require('./../wrappers/googlewrapper');

                google.api('drive', 'v3', function (drive) {
                    drive.files.list({
                        'q': '"' + parentFolder + '" in parents and trashed = false'
                    }, function (errDrive, resDrive) {
                        if (errDrive) throw errDrive;

                        redis.set(
                            key,
                            JSON.stringify(resDrive),
                            function (errRedis, resRedis) {
                                if (errRedis) throw errRedis;

                                if (resRedis) {
                                    __resLocals(resDrive, next, res);
                                }
                            });

                        redis.expire(key, 86400);
                    });
                });
            }

            else {
                redis.get(key, function (errRedis, resRedis) {
                    if (errRedis) throw errRedis;

                    __resLocals(resRedis, next, res);
                });
            }
        });
    }
};