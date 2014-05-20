var tagCloudCtrl = function ($scope, tagCloudService) {
	
	$scope.tagCloud = tagCloudService.tagCloud;
	
	tagCloudService.getTagCloudData();

	$scope.roundFontSize = function(v, minV , maxV) {
		var minFS = 100,		//minimum font size in %
		maxFS = 500;		//maximum font size in %
		return minFS + Math.floor(v / ((maxV - minV) / (maxFS - minFS)));
	};

		
};

tagCloudCtrl.$inject = ['$scope', 'tagCloudService'];