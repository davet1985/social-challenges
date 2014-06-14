//tag cloud
var userPopularCtrl = function ($scope, userService) {
	userService.getTagCloudData('users','popular', '5').then(function(d) {
		$scope.tagCloud = d.data;
	});
};
userPopularCtrl.$inject = ['$scope', 'userService'];