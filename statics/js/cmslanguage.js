/**
 * Created by chadsfather on 20/2/16.
 */
/**
 * Cms Language front controller
 *
 * @param $rootScope
 * @param $scope
 * @param $log
 * @param $q
 * @param language
 * @constructor
 */
function CmslanguageCtrl ($rootScope, $scope, $log, $q, language) {
    $scope.langkeys = [];

    $q.all([
        language.getavailablelangs(),
        language.getkeys()
    ])
        .then(function (
            response
        ) {
            $scope.langs = response[0].data[0].languages;

            var keys = response[1].data;

            angular.forEach(keys, function (v, k) {
                keys[k].translates = JSON.parse(keys[k].translates);
            });

            $scope.langkeys = keys;
        });

    $scope.addkey = function () {
        $scope.langkeys.push({});
    };

    $scope.delkey = function (k, key) {
        language.deletekey(key).then(function () {
            delete $scope.langkeys[k];
        });
    };

    $scope.savekeys = function () {
        angular.forEach($scope.langkeys, function (v, k) {
            language.savekeys(v);
        });
    };
}

/**
 * Factory that request idioms api
 *
 * @param $rootScope
 * @param $http
 * @returns {{getavailablelangs: Function, savekeys: Function}}
 */
function language ($rootScope, $http) {
    return {
        'getavailablelangs': function () {
            return $http.get('/langs-availables/');
        },

        'getkeys': function () {
            return $http.get('/langs-get-keys/');
        },

        'deletekey': function (key) {
            return $http.get(
                '/langs-delete-key/',
                {
                    'params': {
                        'key': key
                    }
                }
            );
        },

        'savekeys': function (obj) {
            return $http.get(
                '/langs-save-keys/',
                {
                    'params': obj
                }
            )
        }
    }
}

function getvaluefrommodel ($rootScope, $log) {
    return {
        'restrict': 'AEC',
        'scope': {
            'from': '='
        },
        'link': function ($scope, $element, $attrs) {
            var from = $scope.from,
                translates = JSON.parse($scope.$parent.$parent.$parent.langkeys[from.k].translates);
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
        '$http',
        CmslanguageCtrl
    ])
    .directive('getvaluefrommodel', [
        '$rootScope',
        '$log',
        getvaluefrommodel
    ])
    .factory('language', [
        '$rootScope',
        '$http',
        language
    ]);
