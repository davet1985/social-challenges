/* jshint -W117 */
/* jshint -W065 */

var mainCtrl = function ($scope, $location, $http, $window) {
	
	$scope.getPageTag = function() {
		return $location.path().split('/')[2]||'Unknown';
    };

	//ckeck if country code exists - if not go get it
	if (window.localStorage.getItem('CountryCode') !== null){
		$scope.countryCode = window.localStorage.getItem('CountryCode');
	} else{
		$http({method: 'GET', url: 'http://freegeoip.net/json/'})
		.success(function(data){
			window.localStorage.setItem('CountryCode', data.country_code);
			$scope.countryCode = window.localStorage.getItem('CountryCode');
		})
		.error(function(data) {
			// ok lets just set a value
			window.localStorage.setItem('CountryCode', 'us');
		});
	}

};

mainCtrl.$inject = ['$scope', '$location', '$http', '$window'];