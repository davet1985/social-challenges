/* jshint -W089 */

var signupCtrl = function ($scope, $location, $http, configService, $timeout, $anchorScroll) {

    $scope.processForm = function(isValid){
        if (isValid){
            
            console.log($scope.username);
            console.log($scope.email);
            console.log($scope.user.password);
            console.log($scope.user.passwordConfirm);

            var postData = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.user.password,
                confirmPassword: $scope.user.passwordConfirm
            };
            
            $http({
                method  : 'POST',
                url     : configService.API_END_POINT+'auth/create',
                data: postData,
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
                console.log(data.status);

                if (data.status === 'Password not strong enough'){
                    $timeout(function() {
                        $scope.errorMessagePassword = '';
                    }, 3500);
                    $scope.errorMessagePassword = data.status;
                    
                } else{
                    $location.path('/login');
                }
                

            })
            .error(function(data){
                //console.log('error '+data);
            });

        } else{
            $scope.submittedError = true;
            $anchorScroll('top');

        }

    };
};

signupCtrl.$inject = ['$scope', '$location', '$http', 'configService', '$timeout', '$anchorScroll'];
