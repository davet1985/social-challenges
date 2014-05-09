
var RatingDemoCtrl = function ($scope, $location) {

	$scope.max = 5;

	var tagName = $scope.getPageTag();

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	// do something with value
	$scope.getValue = function (value, prevId, currentId, nextId) {
		$location.path('/'+tagName+'/'+nextId+'/'+currentId);
	};

};

RatingDemoCtrl.$inject = ['$scope', '$location'];
