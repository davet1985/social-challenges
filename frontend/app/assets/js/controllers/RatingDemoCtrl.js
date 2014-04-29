/* jshint -W117 *///ignore alert error 

socialChallengeApp.controller('RatingDemoCtrl', function ($scope){

	$scope.max = 5;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	// do something with value
	$scope.getValue = function (value) {
		alert('you selected '+value);
	};
});


