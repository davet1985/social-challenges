//tag cloud
var tagCloudCtrl = function ($scope, tagCloudService) {
	tagCloudService.getTagCloudData('tag','all', 'all', '15').then(function(d) {
		$scope.tagCloud = d.data;
	});
};
tagCloudCtrl.$inject = ['$scope', 'tagCloudService'];

//Most popular tags
var tagPopularCtrl = function ($scope, tagCloudService) {

	tagCloudService.getTagCloudData('tag','popular', 'all', '15').then(function(d) {
		$scope.tagCloud = d.data;
	});
};
tagPopularCtrl.$inject = ['$scope', 'tagCloudService'];

//random tags
var tagRandomCtrl = function ($scope, tagCloudService) {

	tagCloudService.getTagCloudData('tag','random', 'all', '15').then(function(d) {
		$scope.tagCloud = d.data;
	});
};
tagRandomCtrl.$inject = ['$scope', 'tagCloudService'];


//Most recent tags
var tagRecentCtrl = function ($scope, tagCloudService) {
	tagCloudService.getTagCloudData('tag','recent', 'all', '15').then(function(d) {
		$scope.tagCloud = d.data;
	});
};
tagRecentCtrl.$inject = ['$scope', 'tagCloudService'];

app.filter('slice', function() {
	return function(arr, start, end) {
		return (arr || []).slice(start, end);
	};
});