var homepageCtrl = function ($scope, tagCloudService, $location) {

	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('user', 'recent', 'all', '5');

};

homepageCtrl.$inject = ['$scope', 'tagCloudService', '$location'];