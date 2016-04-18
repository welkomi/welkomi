/**
 * Created by ssanchez on 15/01/16.
 */

/**
 * Module that allow FB graph API
 *
 * @param $rootScope
 * @param $http
 * @param $window
 * @returns {{init: Function, setScopes: Function, getStatusLogin: Function, api: Function, login: Function, loginToWelkoni: Function, exchangePictureProfile: Function}}
 * @constructor
 */
function FBF ($rootScope, $http, $window) {
    $rootScope.scopes = 'public_profile';

    function parseParamsFromFB (user) {
        console.log('DEVFB', user.locale.name);

        var birthday = user.birthday.split('/'),
            locale = user.locale.split('_');

        user.username = user.email;
        user.locale = locale[0];
        user.birthdayday = birthday[1];
        user.birthdaymonth = birthday[0];
        user.birthdayyear = birthday[2];
        user.location = user.location.name;
        user.firstname = user.first_name;
        user.lastname = user.last_name;
        user.password = user.email;
        user.logintype = 'fb';

        delete user.first_name;
        delete user.last_name;
        delete user.email;
        delete user.birthday;

        return user;
    }

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
         * cb1: return only the current state of login user
         * cb2: callback for the user logged in
         * cb3: callback for the user loged off
         *
         * @param cb1
         * @param cb2
         * @param cb3
         */
        getStatusLogin: function (cb1, cb2, cb3) {
            FB.getLoginStatus(function(response) {
                if (typeof cb1 === 'function') {
                    cb1(response);

                    if (typeof cb3 === 'function') cb3();
                }

                else if (
                    response.status === 'connected'
                    && typeof cb2 === 'function'
                ) {
                    cb2(response);
                }

                else if (typeof cb3 === 'function') {
                    cb3();
                }
            });
        },

        /**
         * Perform request API
         *
         * @param url
         * @param params
         * @param cb
         */
        api: function (url, params, cb) {
            FB.api(
                url,
                params || {},
                function (response) {
                    if (typeof cb === 'function') cb(response);
                }
            )
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
        },

        /**
         * Send data from FB to welkomi login API
         *
         * @param user
         * @param cb
         */
        loginToWelkoni: function (user, cb) {
            $http.post(
                '/register/',
                parseParamsFromFB(user),
                {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;"
                }
            )
                .success(function (data, status) {
                    if (data) {
                        if (!$window.__user__) {
                            $http.post(
                                '/authenticate-ajax/',
                                {
                                    'username': data.username,
                                    'logintype': data.logintype
                                })
                                .then(function (response) {
                                    if (response.data.success) {
                                        $window.location.reload();

                                        return;
                                    }

                                    if (typeof cb === 'function') {
                                        cb(data, user.id);
                                    }
                                });
                        }

                        if (typeof cb === 'function') {
                            cb(data, user.id);
                        }
                    }
                })
        },

        /**
         * Exchange the user picture profile in large mode from FB
         *
         * @param id
         * @param cb
         */
        exchangePictureProfile: function (id, cb) {
            FB.api(
                '/me/picture?type=large',
                {},
                function (response) {
                    if (typeof cb === 'function') {
                        cb(response.data.url);
                    }
                }
            )
        }
    }
}

/**
 * Module that allow FB graph API
 */
angular.module('FBF', [])
    .factory('FBF', [
        '$rootScope',
        '$http',
        '$window',
        FBF
    ]);