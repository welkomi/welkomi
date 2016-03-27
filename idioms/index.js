/**
 * Created by chadsfather on 18/12/15.
 */
exports.init = function () {
    return function (req, res, next) {
        req.setLocale(req.params.lang);

        next();
    }
};

exports.getAvailableLangs = function (callback) {
    require('./availableLangs.js').init(function () {
        callback();
    });
};
