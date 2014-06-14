var uploadsCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('all', 'popular', 'all', '6').then(function(d) {
		$scope.uploads = d.data;
	});
};
uploadsCtrl.$inject = ['$scope', 'uploadsService'];

var uploadsVideosCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('video', 'popular', 'all', '6').then(function(d) {
		$scope.uploadsVideo = d.data;
	});
};
uploadsVideosCtrl.$inject = ['$scope', 'uploadsService'];