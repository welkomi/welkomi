/**
 * Created by chadsfather on 18/12/15.
 */

/**
 * Set the locale for the app
 *
 * @returns {Function}
 */
exports.init = function () {
    return function (req, res, next) {
        var language = req.params.lang;

        res.cookie(
            'langcookie',
            language,
            {
                'maxAge': 900000,
                'httpOnly': true
            }
        );

        req.setLocale(language);

        next();
    }
};


/**
 * Set de default languages
 *
 * @param callback
 */
exports.getAvailableLangs = function (callback) {
    require('./availableLangs.js').init(function () {
        callback();
    });
};