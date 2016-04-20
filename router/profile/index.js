/**
 * Created by chadsfather on 15/12/15.
 */

var User = require('./../../models').model('User');

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
                    var userid = req.params.user.match(/(.*)-([0-9]+)/),
                        userid = userid[2];

                    User
                        .find({
                            '_id': userid
                        })
                        .select('-password')
                        .select('-__v')
                        .exec(function (errFind, resFind) {
                            if (errFind) throw errFind;

                            res.render('profile', {
                                'visitedUser': resFind[0]
                            });
                        });
                });
        }
    );
};
