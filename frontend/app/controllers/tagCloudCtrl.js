//tag cloud
var tagCloudCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'cloud', 'all');

	//set default
	$scope.radioModel = 'all';

	$scope.sortBy = function(sortby, show){
		if(sortby === 'popular'){
			tagCloudService.getTagCloudData('tag', 'popular', 'all', show);
		} else if(sortby === 'recent'){
			tagCloudService.getTagCloudData('tag', 'recent', 'all', show);
		} else if (sortby === 'all'){
			tagCloudService.getTagCloudData('tag', 'cloud', 'all', show);
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
	tagCloudService.getTagCloudData('tag', 'popular', 'all', '20');
};
tagPopularCtrl.$inject = ['$scope', 'tagCloudService'];

//Most recent tags
var tagRecentCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'recent', 'all', '20');
};
tagRecentCtrl.$inject = ['$scope', 'tagCloudService'];