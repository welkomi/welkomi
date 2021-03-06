/**
 * Created by ssanchez on 28/12/15.
 */
    
var app = angular.module('welkomiApp', [
    'FBF',
    'jkuri.gallery',
    'ui.bootstrap',
    'ngScrollbars',
    'ngDroplet'
]);

app
    .config([
        '$interpolateProvider',
        function ($interpolateProvider) {
            $interpolateProvider
                .startSymbol('<<*')
                .endSymbol('*>>');
        }]);

/**
 * Load FB sdk Async.
 */
window.fbload = function () {
    var js,
        id = 'facebook-jssdk',
        ref = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) {
        return;
    }

    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);
};

/**
 * Common controller for all welkomi app
 *
 * @param $rootScope
 * @param $scope
 * @param $window
 * @constructor
 */
function CommonCtrl ($rootScope, $scope, $window, FBF, $uibModal, $http) {
    $rootScope.User = {};
    $rootScope.__user__ = $window.__user__;

    $scope.config = {
        'autoHideScrollbar': false,
        'theme': 'dark-thick',
        'advanced':{
            'updateOnContentResize': true
        },
        'scrollInertia': 0
    };

    var me = '/me/',
        fieldsreponse = {
        'fields': [
            'id',
            'first_name',
            'last_name',
            'email',
            'birthday',
            'locale',
            'location'
        ].join(',')
    };

    $window.fbload();
    $window.fbAsyncInit = function () {
        FBF.init($window.FBID);
        FBF.setScopes([
            'public_profile',
            'publish_actions',
            'email',
            'user_about_me',
            'user_photos',
            'user_location',
            'user_birthday'
        ]);
        FBF.getStatusLogin(
            function (response) {
                if (
                    $window.__user__
                    && response.status === 'connected'
                ) {
                    FBFapi();
                }
            },
            function (response) {});
    };

    $scope.fbLogin = function () {
        FBF.login(function (response) {
            if (response.status === 'connected') {
                FBFapi();
            }
        });
    };

    $rootScope.FBlogin = $scope.fbLogin;

    function FBFapi () {
        FBF.api(
            me,
            fieldsreponse,
            function (response) {
                FBF.loginToWelkoni(response, setPictureFromFBProfile);
            }
        )
    }

    function setPictureFromFBProfile (user, idFB) {
        if (idFB) {
            FBF.exchangePictureProfile(idFB, function (picture) {
                if ($window.__user__.emailverifyed) {
                    $http.post(
                        '/drive/file/insert/' + $window.__user__.userfolder + '/',
                        {
                            'imgurl': picture,
                            'name': 'profilepicture.jpg'
                        },
                        {
                            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;"
                        }
                    );
                }

                $rootScope.User.pictureProfile = picture;
                $rootScope.$apply();
            });
        }
    }
    
    /**
    * Login Box
    */
    $scope.animationsEnabled = true;

    $scope.openModal = function (size, template) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: template,
            controller: function ($rootScope, $scope) {
                $scope.fbLoginFromModal = function () {
                    $rootScope.FBlogin();
                };

                $scope.close = function () {
                    modalInstance.close();
                };
            },
            size: size
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}

/**
 * Add parallax effect to the element
 *
 * @returns {{restrict: string, link: Function}}
 */
function parallax () {
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs) {
            new Parallax(element[0]);
        }
    }
}

app
    .controller('CommonCtrl', [
        '$rootScope',
        '$scope',
        '$window',
        'FBF',
        '$uibModal',
        '$http',
        CommonCtrl
    ]).
    directive('parallax', [parallax]);

