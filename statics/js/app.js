/**
 * Created by ssanchez on 28/12/15.
 */

var app = angular.module('welkomiApp', [
    'FBF',
    'jkuri.gallery',
    'ui.bootstrap'
]);

app
    .config([
        '$interpolateProvider',
        function ($interpolateProvider) {
            $interpolateProvider
                .startSymbol('[[')
                .endSymbol(']]');
        }]);

/**
 * Load FB sdk Async.
 */
window.fbload = function () {
    var js,
        id = 'facebook-jssdk',
        ref = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) {
        return;
    }

    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);
};

/**
 * Common controller for all welkomi app
 *
 * @param $rootScope
 * @param $scope
 * @param $window
 * @constructor
 */
function CommonCtrl ($rootScope, $scope, $window, FBF) {
    $window.fbload();
    $window.fbAsyncInit = function () {
        FBF.init('1494810927495265');
        FBF.setScopes([
            'public_profile',
            'publish_actions',
            'email',
            'user_photos'
        ]);
        FBF.getStatusLogin(
            function (response) {
                console.log('LOGIN UNKNOW', response);
            },
            function (response) {
                console.log('LOGIN IN', response)
            });
    };

    $scope.fbLogin = function () {
        FBF.login(function (response) {
            FBF.api(
                '/me',
                {
                    'fields': 'email'
                },
                function (response) {
                    console.log('FB response', response);
                }
            );
        });
    };
}

/**
 * Add parallax effect to the element
 *
 * @returns {{restrict: string, link: Function}}
 */
function parallax () {
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs) {
            new Parallax(element[0]);
        }
    }
}

app
    .controller('CommonCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        'FBF',
        CommonCtrl
    ]).
    directive('parallax', [parallax])
