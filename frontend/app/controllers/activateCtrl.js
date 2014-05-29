/* jshint -W089 */

var activateCtrl = function ($scope, $location, $http, configService) {
	
	$scope.getPageToken = function() {
		return $location.path().split('/')[2]||'Unknown';
    };
	
	console.log($scope.getPageToken());
	
	$http({
        method  : 'POST',
        url     : configService.API_END_POINT+'/auth/activate/' + $scope.getPageToken(),
        data: {},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
        },
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data) {
		console.log('got here');
		//usernameService.setUsername('empty', 'empty', 'empty');
				
		//$location.path('/login');
    });


};

activateCtrl.$inject = ['$scope', '$location', '$http', 'configService'];