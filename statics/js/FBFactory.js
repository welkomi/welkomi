/**
 * Created by ssanchez on 15/01/16.
 */

/**
 * Module that allow FB graph API
 *
 * @param $rootScope
 * @returns {{init: Function, setScopes: Function, getStatusLogin: Function, login: Function}}
 * @constructor
 */
function FBF ($rootScope) {
    $rootScope.scopes = 'public_profile';

    return {
        /**
         * Init the FB application
         *
         * @param id
         */
        init: function (id) {
            FB.init({
                'appId': id,
                'channelUrl': 'app/channel.html',
                'status': true,
                'cookie': true,
                'xfbml': true
            });
        },

        /**
         * Set Scope for FB login
         *
         * @param scopes
         */
        setScopes: function (scopes) {
            $rootScope.scopes = [];
            $rootScope.scopes = scopes.join(',');
        },

        /**
         * Get status login from FB
         *
         * @param cb1
         * @param cb2
         * @param cb3
         */
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

        /**
         * Perform FB login
         *
         * @param cb
         */
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

/**
 * Module that allow FB graph API
 */
angular.module('FBF', [])
    .factory('FBF', ['$rootScope', FBF]);