/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter, idioms) {
    expressrouter.prefix(
        ___availableLangs.route,
        function (subroutes) {
            subroutes
                .route(__l('/register-user/'))
                .get(function (req, res) {
                    res.render('registeruser', {})
                });

            subroutes
                .route(__l('/login-user/'))
                .get(function (req, res) {
                    res.render('registeruser', {});
                });
        },
        idioms.init()
    );
};
