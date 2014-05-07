
var RatingDemoCtrl = function ($scope, $location) {

	$scope.max = 5;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	// do something with value
	$scope.getValue = function (value, prevId, currentId, hash) {
		console.log('rating: '+value+ ', previous id: '+prevId+ ', current id: '+currentId+' page: '+hash);
		$location.path(hash);

	};

};

RatingDemoCtrl.$inject = ['$scope', '$location'];
