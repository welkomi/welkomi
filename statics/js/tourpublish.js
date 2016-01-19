/**
 * Created by ssanchez on 8/01/16.
 */

function TourPublishCtrl ($rootScope, $scope) {
  $scope.images = [
        {thumb: '/statics/images/1.jpg', img: '/statics/images/1.jpg'},
            {thumb: '/statics/images/2.jpg', img: '/statics/images/2.jpg'},
            {thumb: '/statics/images/3.jpg', img: '/statics/images/3.jpg'},
            {thumb: '/statics/images/4.jpg', img: '/statics/images/4.jpg'},
            {thumb: '/statics/images/5.jpg', img: '/statics/images/5.jpg'},
            {thumb: '/statics/images/6.jpg', img: '/statics/images/6.jpg'}
      ];

}

app
    .controller('TourPublishCtrl', [
        '$rootScope',
        '$scope',
        TourPublishCtrl
    ]);
