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

}

app
    .controller('TourPublishCtrl', [
        '$rootScope',
        '$scope',
        TourPublishCtrl
    ]);
