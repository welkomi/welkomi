/**
 * Created by chadsfather on 17/12/15.
 */

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

exports.renderUrl = function () {
    return function (req, res, next) {
        res.locals.renderUrl = function (route) {
            var locale = req.res.locale;

            return '/' + locale + __(route);
        };

        next();
    };
};
