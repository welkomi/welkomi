/**
 * Created by ssanchez on 28/12/15.
 */

var app = angular.module('welkomiApp', []);

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
function CommonCtrl ($rootScope, $scope, $window) {
    $window.fbload();
    $window.fbAsyncInit = function () {
        FB.init({
            appId: '1494810927495265',
            channelUrl: 'app/channel.html',
            status: true,
            cookie: true,
            xfbml: true
        });

        FB.Event.subscribe('auth.authResponseChange', function (res) {
            console.log('FB', res);
        });
    }
}

app
    .controller('CommonCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        CommonCtrl
    ]);