var tagSearchCtrl = function ($scope, tagSearchService, tagCloudService, $location) {

	$scope.radioModel = 'all';


	if ($scope.query === '' || $scope.query === undefined){
		$scope.tagCloud = tagSearchService.tagCloud;
		tagSearchService.getTagSearchData('all', 'all', 'all');
	}

	if($scope.query !== '' || $scope.query !== undefined) {
		$scope.tagCloud = tagSearchService.tagCloud;
		tagSearchService.getTagSearchData('all', $scope.query, 'all');
	} else{
		$scope.tagCloud = tagCloudService.tagCloud;
		tagCloudService.getTagCloudData('tag', 'cloud', 'all');
	}

	$scope.searchTags = function(mode, searchString, count){

		if($scope.query !== '') {
			$scope.tagCloud = tagSearchService.tagCloud;
			tagSearchService.getTagSearchData(mode, $scope.query, count);
			document.getElementById('top-search').value = '';
		}
		if($scope.query === '' || $scope.query === undefined || searchString === '') {
			//console.log('mode '+mode);
			$scope.tagCloud = tagSearchService.tagCloud;
			tagSearchService.getTagSearchData(mode, 'all', count);
		}

		//return tag list length 
		$scope.listLength = function(){
			return document.getElementsByClassName('tag-list').length;
		};
	};
};
tagSearchCtrl.$inject = ['$scope', 'tagSearchService', 'tagCloudService', '$location'];
