/**
 * Created by chadsfather on 9/4/16.
 */

function ProfileCtrl ($rootScope, $scope, Upload, $http, $log, $window) {
    Upload.setDefaults({
        'ngfMaxSize': 20000000
    });

    $scope.$watch('files', function (files) {
        if (angular.isArray(files)) {
            Upload
                .base64DataUrl(files)
                .then(function (urls) {
                    angular.forEach(urls, function (v, k) {
                        $http.post(
                            '/drive/file/insert/' + $window.__user__.userfolder + '/',
                            {
                                'img': v,
                                'name': 'profilepicture.jpg'
                            },
                            {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                            })
                            .then(function (data) {
                                $log.debug('----------------- ' + k + ' -------------------');
                                $log.debug(data);
                                $log.debug('-----------------------------------------------');
                            });
                    });
                });
        }
    });
}

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
        'Upload',
        '$http',
        '$log',
        '$window',
        ProfileCtrl
    ])
    .directive('scrolltofixed', [
        '$rootScope',
        scrolltofixed
    ]);



  
