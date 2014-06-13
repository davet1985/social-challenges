var userRecentCtrl = function ($scope, userCloudService) {

	userCloudService.getTagCloudData('user', 'recent', 'all', '5').then(function(d) {
		$scope.tagCloud = d.data;
	});

};

userRecentCtrl.$inject = ['$scope', 'userCloudService'];