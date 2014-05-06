var loginCtrl = function ($scope, $http) {

    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : 'http://localhost:9393/auth/login',
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
            .success(function(data) {
                console.log(data);

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

loginCtrl.$inject = ['$scope', '$http'];
