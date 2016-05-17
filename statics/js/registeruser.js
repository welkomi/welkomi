/**
 * Created by ssanchez on 8/01/16.
 */

function RegisterUserCtrl ($rootScope, $scope, $http, $log) {
    $scope.submit = function (e) {
        e.preventDefault();

        if (!$scope.new_user.$invalid) {

            $scope.user.username = $scope.user.email;

            $http.post(
                '/register/',
                $scope.user,
                {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;"
                }
            )
                .success(function (data, status) {
                    if (
                        data[0].username
                        && !data[0].found
                    ) {
                        $('#submitedNewUserOk').submit();
                    }

                    else {
                        $log.debug(data);
                    }
                });
        }
    }
}

app
    .controller('RegisterUserCtrl', [
        '$rootScope',
        '$scope',
        '$http',
        '$log',
        RegisterUserCtrl
    ]);