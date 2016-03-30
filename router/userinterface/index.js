/**
 * Created by chadsfather on 15/12/15.
 */

exports.init = function (expressrouter) {
    expressrouter.prefix(___availableLangs.route, function (subroutes) {
        subroutes
            .route(__l('/register-user/'))
            .get(function (req, res) {
                res.render('registeruser', {})
            });
    });

    //expressrouter.get(
    //    __l('/:lang/register-user/'),
    //    function (req, res) {
    //        res.render('registeruser', {});
    //    });

    //expressrouter.get(
    //    __l(___availableLangs.route + '/login-user/'),
    //    function (req, res) {
    //        res.render('registeruser', {});
    //    });
};
