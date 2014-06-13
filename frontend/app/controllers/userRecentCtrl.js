var userRecentCtrl = function ($scope, userCloudService) {

	userCloudService.getTagCloudData('tag', 'recent', 'all', '5').then(function(d) {
		$scope.tagCloud = d.data;
	});

};

userRecentCtrl.$inject = ['$scope', 'userCloudService'];