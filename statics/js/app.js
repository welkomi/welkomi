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
 * Common controller for welkomiApp
 *
 * @param $rootScope
 * @param $scope
 * @constructor
 */
function CommonCtrl ($rootScope, $scope, $window) {}

app
    .controller('CommonCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        CommonCtrl
    ]);