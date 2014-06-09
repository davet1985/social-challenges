
//Most recent tags
var tagRecentCtrl = function ($scope, tagCloudRecentService) {
	$scope.tagCloud = tagCloudRecentService.tagCloud;
	tagCloudRecentService.getTagCloudRecentData('tag', 'recent', 'all', '20');
};
tagRecentCtrl.$inject = ['$scope', 'tagCloudRecentService'];