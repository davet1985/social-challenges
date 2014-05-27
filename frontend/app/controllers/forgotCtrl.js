/* jshint -W089 */

var forgotCtrl = function ($scope, $location, $http, configService, usernameService) {

    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : configService.API_END_POINT+'auth/forgot-password',
            data: {'email': $scope.email},
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
				
				console.log(data.token);
				//usernameService.setUsername(data.username, data.id, data.token);
				
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

forgotCtrl.$inject = ['$scope', '$location', '$http', 'configService', 'usernameService'];
