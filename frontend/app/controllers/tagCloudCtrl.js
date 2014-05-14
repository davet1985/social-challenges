var tagCloudCtrl = function ($scope, tagCloudService) {
	
	$scope.tagCloud = tagCloudService.tagCloud;
	
	tagCloudService.getTagCloudData();

	$scope.roundFontSize = function(v, maxV) {
		var minV = 0,		//minimal value from dataset
		minFS = 100,		//minimum font size in %
		maxFS = 300;		//maximum font size in %
		return minFS + Math.floor(v / ((maxV - minV) / (maxFS - minFS)));
	};

		
};

tagCloudCtrl.$inject = ['$scope', 'tagCloudService'];