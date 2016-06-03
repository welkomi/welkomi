/**
 * Created by chadsfather on 15/12/15.
 */

var User = require('./../../models').model('User'),
    redis = require('./../../wrappers/rediswrapper').init();

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
                        userid = userid[2],
                        codeVerification = req.query.account_verification;

                    if (
                        codeVerification
                        && !req.user.emailverifyed
                    ) {
                        var password = require('password-hash-and-salt');

                        password('account-verfication-' + req.user._id).verifyAgainst(codeVerification, function (errVerify, resVerify) {
                            if (errVerify) throw errVerify;

                            if (resVerify) {
                                User
                                    .update(
                                    {
                                        '_id': req.user._id
                                    },
                                    {
                                        '$set': {
                                            'emailverifyed': true
                                        }
                                    }, function (errUpdate, resUpdate) {
                                        if (errUpdate) throw errUpdate;
                                    })
                            }
                        });
                    }

                    User
                        .find({
                            '_id': userid
                        })
                        .select('-password')
                        .select('-__v')
                        .exec(function (errFind, resFind) {
                            if (errFind) throw errFind;

                            var request_id = req.user
                                ? ~~req.user._id
                                : null;

                            res.render('profile', {
                                'visitedUser': resFind[0],
                                'enableEdit': request_id === ~~userid
                            });
                        });
                });
        }
    );
};
