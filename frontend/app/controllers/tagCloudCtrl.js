//tag cloud
var tagCloudCtrl = function ($scope, tagCloudService, tagCloudRecentService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'cloud', 'all');

	//set default
	$scope.radioModel = 'all';

	//search sort
	$scope.sortBy = function(sortby, show){
		if(sortby === 'popular'){
			tagCloudService.getTagCloudData('tag', 'popular', 'all', show);
		}
		if(sortby === 'recent'){
			tagCloudService.getTagCloudData('tag', 'recent', 'all', show);
		}
		if (sortby === 'all'){
			tagCloudService.getTagCloudData('tag', 'cloud', 'all', show);
		}
	};

};
tagCloudCtrl.$inject = ['$scope', 'tagCloudService', 'tagCloudRecentService'];

//Most popular tags
var tagPopularCtrl = function ($scope, tagCloudService) {
	$scope.tagCloud = tagCloudService.tagCloud;
	tagCloudService.getTagCloudData('tag', 'popular', 'all', '20');
};
tagPopularCtrl.$inject = ['$scope', 'tagCloudService'];