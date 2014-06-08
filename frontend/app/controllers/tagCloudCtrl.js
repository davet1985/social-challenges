//tag cloud
var tagCloudCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('cloud');
};
tagCloudCtrl.$inject = ['$scope', 'tagCloudService'];

//Most popular tags
var tagPopularCtrl = function ($scope, tagCloudService) {
	$scope.tagPopularCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'popular', 'all', '10');
};
tagPopularCtrl.$inject = ['$scope', 'tagCloudService'];

//Most recent tags
var tagRecentCtrl = function ($scope, tagCloudService) {
	$scope.tagRecentCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'recent', 'all', '10');
};
tagRecentCtrl.$inject = ['$scope', 'tagCloudService'];