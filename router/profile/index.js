/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter) {
    expressrouter.prefix(
        ___availableLangs.route,
        function (subroutes) {
            /**
             * Url to register users
             */

            subroutes
                .route(__l('/profile/:user/'))
                .get(function (req, res) {
                    res.render('profile', {});
                });
        }
    );
};
