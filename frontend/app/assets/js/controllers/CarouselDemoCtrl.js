/* jshint -W117 */

socialChallengeApp.controller('CarouselDemoCtrl', function ($scope){

	//$scope.myInterval = 5000;
	var slides = $scope.slides = [];

	$scope.showNext = function(){
		console.log('clicked');
		var index = ($('#myCarousel .active').index()+1)%(slides.length);
		var modIndex = (((index)%(slides.length))+(slides.length))%(slides.length);
		$scope.slides[modIndex].active=true;
	};
	
});