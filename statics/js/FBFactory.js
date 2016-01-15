/**
 * Created by ssanchez on 15/01/16.
 */

function FBF ($rootScope) {
    $rootScope.scopes = 'public_profile';

    return {
        init: function (id) {
            FB.init({
                'appId': id,
                'channelUrl': 'app/channel.html',
                'status': true,
                'cookie': true,
                'xfbml': true
            });
        },

        setScopes: function (scopes) {
            $rootScope.scopes = [];
            $rootScope.scopes = scopes.join(',');
        },

        getStatusLogin: function (cb1, cb2, cb3) {
            FB.getLoginStatus(function(response) {
                if (typeof cb1 === 'function') {
                    cb1(response);
                }
                else if (
                    response.status === 'connected'
                    && typeof cb2 === 'function'
                ) {
                    cb2();
                }

                else if (typeof cb3 === 'function') {
                    cb3();
                }
            });
        },

        login: function (cb) {
            FB.login(function (user) {
                    if (typeof cb === 'function') {
                        cb(user);
                    }
                },
                {
                    'scope': $rootScope.scopes
                });
        }
    }
}

angular.module('FBF', [])
    .factory('FBF', ['$rootScope', FBF]);