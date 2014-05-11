var topCtrl = function ($scope, topService) {

	$scope.top = topService.top;
	topService.gettopData();
};

topCtrl.$inject = ['$scope', 'topService'];
