
var RatingDemoCtrl = function ($scope) {

	$scope.max = 5;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	// do something with value
	$scope.getValue = function (value, id) {
		console.log('rating: '+value+ ', id: '+id);
	};

};

RatingDemoCtrl.$inject = ['$scope'];
