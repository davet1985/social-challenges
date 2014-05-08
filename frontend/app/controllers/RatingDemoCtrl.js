
var RatingDemoCtrl = function ($scope, $location) {

	$scope.max = 5;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	// do something with value
	$scope.getValue = function (value, prevId, currentId, path) {
		console.log('rating: '+value+ ', previous id: '+prevId+ ', current id: '+currentId+' request: '+path);
		$location.path(path);

	};

};

RatingDemoCtrl.$inject = ['$scope', '$location'];
