//tag cloud
var tagCloudCtrl = function ($scope, tagCloudService, tagCloudRecentService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'cloud', 'all');
};
tagCloudCtrl.$inject = ['$scope', 'tagCloudService', 'tagCloudRecentService'];

//Most popular tags
var tagPopularCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'popular', 'all', '20');
};
tagPopularCtrl.$inject = ['$scope', 'tagCloudService'];