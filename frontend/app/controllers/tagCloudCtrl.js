//tag cloud
var tagCloudCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('cloud');

	//set default
	$scope.radioModel = 'all';

	$scope.sortBy = function(sortby, show){
		if(sortby === 'popular'){
			tagCloudService.getTagCloudData('popular', 'all', show);
		} else if(sortby === 'recent'){
			tagCloudService.getTagCloudData('recent', 'all', show);
		} else if (sortby === 'all'){
			tagCloudService.getTagCloudData('cloud');
		}
	};

	$scope.filterFunction = function(element) {
		return element.name.match(/^Ma/) ? true : false;
	};
};
tagCloudCtrl.$inject = ['$scope', 'tagCloudService'];

//Most popular tags
var tagPopularCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('popular', 'all', '20');
};
tagPopularCtrl.$inject = ['$scope', 'tagCloudService'];

//Most recent tags
var tagRecentCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('recent', 'all', '20');
};
tagRecentCtrl.$inject = ['$scope', 'tagCloudService'];