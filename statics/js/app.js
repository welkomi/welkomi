/**
 * Created by ssanchez on 28/12/15.
 */

var app = angular.module('welkomiApp', [
    'FBF'
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
            null,
            null,
            function () {
                console.log('RESULT LOGIN:', FBF.login());
            });
    }
}

app
    .controller('CommonCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        'FBF',
        CommonCtrl
    ]);