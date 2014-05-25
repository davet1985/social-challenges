/* jshint -W089 */

var signupCtrl = function ($scope, $location, $http, configService) {

    $scope.processForm = function() {
        console.log($scope.email);
		console.log($scope.password);
		
		$http({
            method  : 'POST',
            url     : configService.API_END_POINT+'auth/create',
            data: {'username': $scope.username, 'email': $scope.email, 'password': $scope.password, 'confirmPassword': $scope.password_repeat},
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
				
				//console.log(data.token);
				//usernameService.setUsername(data.username, data.id, data.token);
				console.log(data);
				$location.path('/login');

                // if (!data.success) {
                //   // if not successful, bind errors to error variables
                //     $scope.errorName = data.errors.name;
                //     $scope.errorSuperhero = data.errors.superheroAlias;
                // } else {
                //   // if successful, bind success message to message
                //     $scope.message = data.message;
                // }
            });
    };

};

signupCtrl.$inject = ['$scope', '$location', '$http', 'configService'];
