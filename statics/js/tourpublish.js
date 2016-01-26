/**
 * Created by ssanchez on 8/01/16.
 */

function TourPublishCtrl ($rootScope, $scope) {
  $scope.images = [
        {thumb: '/statics/images/tourimages/thumbs/1.jpg', img: '/statics/images/tourimages/1.jpg'},
            {thumb: '/statics/images/tourimages/thumbs/2.jpg', img: '/statics/images/tourimages/2.jpg'},
            {thumb: '/statics/images/tourimages/thumbs/3.jpg', img: '/statics/images/tourimages/3.jpg'},
            {thumb: '/statics/images/tourimages/thumbs/4.jpg', img: '/statics/images/tourimages/4.jpg'},
            {thumb: '/statics/images/tourimages/thumbs/5.jpg', img: '/statics/images/tourimages/5.jpg'},
      ];

    /**
     * Funciones para le datepicker
     */
    $scope.today = function() {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.open = function() {
        $scope.popup.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.popup = {
        opened: false
    };

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
}

app
    .controller('TourPublishCtrl', [
        '$rootScope',
        '$scope',
        TourPublishCtrl
    ]);
