/**
 * Created by ssanchez on 22/04/16.
 */

/**
 * Checked for user logged
 * if not response 401 error
 *
 * @returns {Function}
 */
exports.init = function () {
    return function (req, res, next) {
        if (process.env.NODE_ENV === 'production') {
            if (!req.user) {
                var httpError = 401;

                res.status(httpError);
                res.json({
                    'err': httpError,
                    'msg': 'You are not authorized :P '
                });
            }

            next();
        }

        next();
    }
};
