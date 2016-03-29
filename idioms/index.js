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
        req.setLocale(req.params.lang);

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