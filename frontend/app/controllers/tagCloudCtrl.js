var tagCloudCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData();
};

tagCloudCtrl.$inject = ['$scope', 'tagCloudService'];