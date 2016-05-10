/**
 * Created by chadsfather on 9/4/16.
 */

function ProfileCtrl ($rootScope, $scope) {
    $scope.interface = {};
    $scope.uploadCount = 0;
    $scope.success = false;
    $scope.error = false;
    $scope.interface.FILE_TYPES = {
        VALID: 1,
        INVALID: 2,
        DELETED: 4,
        UPLOADED: 8
    };

    $scope.$on('$dropletReady', function whenDropletReady() {
        $scope.interface.allowedExtensions([
            'png',
            'jpg'
        ]);
    });

    $scope.$on('$dropletFileAdded', function onDropletAddedFile (event, file) {
        console.log(file);
    });

    $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
        $scope.uploadCount = files.length;
        $scope.success     = true;

        console.log(response, files);

        $timeout(function timeout() {
            $scope.success = false;
        }, 5000);
    });
}

app
    .controller('ProfileCtrl', [
        '$rootScope',
        '$scope',
        ProfileCtrl
    ]);


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
                'marginTop': 130,
                'limit': $('.publishpage').outerHeight() - ($('.asidefather').outerHeight() - 64)
            });
        }
    }
}

app
    .controller('TourPublishCtrl', [
        '$rootScope',
        '$scope',
        TourPublishCtrl
    ]).
    directive('scrolltofixed', [
        '$rootScope',
        scrolltofixed
    ]);
