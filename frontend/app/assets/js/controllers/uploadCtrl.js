app.controller('ratingCtrl', function ($scope, ratingService){

    $scope.ratings = ratingService.ratings;

	ratingService.getRatingData();


});



