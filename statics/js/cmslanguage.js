/**
 * Created by chadsfather on 20/2/16.
 */

function CmslanguageCtrl ($rootScope, $scope, $log, $q, language) {
    $scope.langkeys = {};
    $scope.keys = [];
    $scope.keys.push(1);

    $q.all([
        language.get()
    ])
        .then(function (languagesAvailables) {
            $scope.langs = languagesAvailables[0].data;
        });

    $scope.addkey = function () {
        $scope.keys.push(1);
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
