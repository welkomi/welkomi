/**
 * Created by ssanchez on 28/12/15.
 */

/**
 * Home controller
 *
 * @param $rootScope
 * @param $scope
 * @constructor
 */
function HomeCtrl ($rootScope, $scope, $window) {
    $scope.scrollerNavVisible = true;
}

/**
 * Se añadio la funcionalidad
 * al buscador de la home
 *
 * @param $rootScope
 * @param $window
 * @param $document
 * @returns {{restrict: string, link: Function}}
 */
function scrollernav ($rootScope, $window, $document) {
    return {
        'restrict': 'C',
        'link': function ($scope, $element, $attrs) {
            var window = angular.element($window),
                body = angular.element($document[0].body),
                element = angular.element($element);

            window.on('scroll', function () {
                if (window.scrollTop() > 360) {
                    body.removeClass('specialheader');
                    element.removeClass('specialSearch');
                }

                else {
                    body.addClass('specialheader');
                    element.addClass('specialSearch');
                }
            });
        }
    }
}

app
    .controller('HomeCtrl', [
        '$rootScope',
        '$scope',
        '$window',
         HomeCtrl
    ])
    .directive('scrollernav', [
        '$rootScope',
        '$window',
        '$document',
        scrollernav
    ]);
