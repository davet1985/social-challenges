var mainCtrl = function ($scope, $location, $http) {
	
	$scope.getPageTag = function() {
		return $location.path().split('/')[1]||'Unknown';
    };

    //console.log($scope.getPageTag());
};

mainCtrl.$inject = ['$scope', '$location', '$http'];
