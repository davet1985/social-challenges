/* jshint -W089 */

var loginCtrl = function ($scope, $location, $http, configService, usernameService) {


    $scope.processForm = function(isValid){
        if (isValid){

            $http({
                method  : 'POST',
                url     : configService.API_END_POINT+'auth/login',
                data: {'username': $scope.username, 'password': $scope.password},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data, status, headers, config) {
                console.log(data.token);
                usernameService.setUsername(data.username, data.id, data.token);
                //console.log('success!!!');
                $location.path('/upload');

            }).error(function(data) {
                $scope.errorMessage = data.error;
            });
    
        } else{
            //console.log('error');
            $scope.submittedError = true;

        }
    };


};

loginCtrl.$inject = ['$scope', '$location', '$http', 'configService', 'usernameService'];
