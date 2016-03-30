/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, idioms) {
    expressrouter.prefix(
        ___availableLangs.route,
        function (subroutes) {
            /**
             * Url to register users
             */
            subroutes
                .route(__l('/register-user/'))
                .get(function (req, res) {
                    res.render('registeruser', {})
                });

            /**
             * Url for login users
             */
            subroutes
                .route(__l('/login-user/'))
                .get(function (req, res) {
                    res.render('registeruser', {});
                });
        }
    );
};
