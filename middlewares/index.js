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