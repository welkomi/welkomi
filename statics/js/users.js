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
function UsersCtrl ($rootScope, $scope, $window) {
    $scope.config = {
        'autoHideScrollbar': false,
        'theme': 'dark-thick',
        'advanced':{
            'updateOnContentResize': true
        },
        'scrollInertia': 0
    }
}

app
    .controller('UsersCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        UsersCtrl
    ]);
