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
function HomeCtrl ($scope) {
    $scope.scrollerNavVisible = true;
}

/**
 * Directive to appear nav in home index
 *
 * @param $window
 * @param $document
 * @returns {{restrict: string, link: Function}}
 */
function scrollernav ($window, $document) {
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs) {
            var classHeaderPro = 'headerpro',
                classNavBarFixedTop = 'navbar-fixed-top',
                body = $document[0].body,
                elementOffset = element[0].getBoundingClientRect();

            element.addClass(classHeaderPro);

            $window.onscroll = function () {
                if(
                    body.scrollTop > elementOffset.top
                    && element.hasClass(classHeaderPro)
                ) {
                    scope.scrollerNavVisible = true;

                    element
                        .removeClass(classHeaderPro)
                        .addClass(classNavBarFixedTop);
                }

                else if (
                    body.scrollTop <= elementOffset.top
                    && element.hasClass(classNavBarFixedTop)
                ) {
                    scope.scrollerNavVisible = false;

                    element
                        .removeClass(classNavBarFixedTop)
                        .addClass(classHeaderPro);
                }
            }
        }
    }
}

app
    .controller('HomeCtrl', [
        '$rootScope',
        '$scope',
        HomeCtrl
    ])
    .directive('scrollernav', [
        '$window',
        '$document',
        scrollernav
    ]);