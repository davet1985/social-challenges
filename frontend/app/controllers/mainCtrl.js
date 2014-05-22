var mainCtrl = function ($scope, $location, $http) {
	
	$scope.getPageTag = function() {
		return $location.path().split('/')[2]||'Unknown';
    };

    //get countrycode
	$http({method: 'GET', url: 'http://freegeoip.net/json/'})
	.success(function(data){
		$scope.countryCode = data.country_code;
	});
	

};

mainCtrl.$inject = ['$scope', '$location', '$http'];