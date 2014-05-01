var ratingCtrl = function ($scope, ratingService) {
	$scope.ratings = ratingService.ratings;
	ratingService.getRatingData();
};

ratingCtrl.$inject = ['$scope', 'ratingService'];