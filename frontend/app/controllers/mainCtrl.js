/* jshint -W117 */
/* jshint -W065 */

var mainCtrl = function ($scope, $location, $http, $window, $cookies, $log, configService, usernameService, md5) {

	$scope.emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
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

    //get user details
    $scope.getUserDetails = function (detail){
		$http({
			method: 'POST',
			data: {
				'userId': $cookies.id
			},
			url: configService.API_END_POINT+'auth/get/'+detail
		})
		.success(function(data){
			//set gravatar email
			$scope.gravatarEmail = md5(data.email);
		});
	};

	//watch for username cookie and show/hide if active
	$scope.$watch(function() { return $cookies.username;}, function() {
		usernameService.isActive().then(function(d) {
			if (d.data.active === true) {
				$scope.isUserLogged = $cookies.username;
				$scope.getUserDetails('email');
			}else{
				$scope.isUserLogged = null;
				$scope.gravatarEmail = null;
			}
		});
	});

	$scope.roundFontSize = function(v, minV , maxV) {
		var minFS = 100,		//minimum font size in %
		maxFS = 500;		//maximum font size in %
		return minFS + Math.floor(v / ((maxV - minV) / (maxFS - minFS)));
	};

};

mainCtrl.$inject = ['$scope', '$location', '$http', '$window', '$cookies','$log', 'configService', 'usernameService', 'md5'];