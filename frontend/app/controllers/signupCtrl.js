/* jshint -W089 */

var signupCtrl = function ($scope, $location, $http, configService) {

    $scope.emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    $scope.processForm = function(isValid){
        if (isValid){
            $scope.processForm = function() {
                console.log($scope.email);
                console.log($scope.password);
                
                $http({
                    method  : 'POST',
                    url     : configService.API_END_POINT+'auth/create',
                    data: {'username': $scope.username, 'email': $scope.email, 'password': $scope.password, 'confirmPassword': $scope.passwordConfirm},
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
                })
                .error(function(data){
                    //console.log('error '+data);
                });
            };

        } else{
            $scope.submittedError = true;

        }

    };
};

signupCtrl.$inject = ['$scope', '$location', '$http', 'configService'];
