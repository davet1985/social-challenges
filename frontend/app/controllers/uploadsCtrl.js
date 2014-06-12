var uploadsCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('popular', 'all', 'all', '5').then(function(d) {
		$scope.uploads = d.data;
	});
};
uploadsCtrl.$inject = ['$scope', 'uploadsService'];

var uploadsVideosCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('popular', 'video', 'all', '5').then(function(d) {
		$scope.uploadsVideo = d.data;
	});
};
uploadsVideosCtrl.$inject = ['$scope', 'uploadsService'];