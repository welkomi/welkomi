/**
 * Created by chadsfather on 20/2/16.
 */

function CmslanguageCtrl ($rootScope, $scope, $log, $q, language) {
    $scope.langkeys = {};
    $scope.keys = [];

    $q.all([
        language.get()
    ])
        .then(function (languagesAvailables) {
            $scope.langs = languagesAvailables[0].data;
        });

    $scope.addkey = function () {
        $scope.keys.push(1);
    }

    $scope.delkey = function (k) {
        delete $scope.langkeys[k];
    }

    $scope.savekeys = function () {
        $log.info($scope.langkeys);
    }
}

function language ($rootScope, $http) {
    return {
        'get': function () {
            return $http.get('/getlangs/');
        }
    }
}

app
    .controller('CmslanguageCtrl', [
        '$rootScope',
        '$scope',
        '$log',
        '$q',
        'language',
        CmslanguageCtrl
    ])
    .factory('language', [
        '$rootScope',
        '$http',
        language
    ]);
