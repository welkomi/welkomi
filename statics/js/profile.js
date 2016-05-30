/**
 * Created by chadsfather on 9/4/16.
 */

function ProfileCtrl ($rootScope, $scope) {}

/**
 * Directiva para manter fixed
 * los datos del usuario
 *
 * @param $rootScope
 * @returns {{restrict: string, link: Function}}
 */
function scrolltofixed($rootScope) {
    return {
        'restrict': 'C',
        'link': function ($scope, $element, $attrs) {
            angular.element($element).scrollToFixed({
                'marginTop': 60
            });
        }
    }
}

app
    .controller('ProfileCtrl', [
        '$rootScope',
        '$scope',
        ProfileCtrl
    ])
    .directive('scrolltofixed', [
        '$rootScope',
        scrolltofixed
    ]);



  
