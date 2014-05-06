var loginCtrl = function ($scope, $http) {

    $scope.attemptLogin = function() {
        console.log('start');

        $http({
            url: 'http://localhost:9393/auth/login',
            method: 'POST',
            data: {'username': 'davethompson21@gmail.com', 'password': 'password12!'},
            // data: xsrf,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            },
            // data: $.param($scope.formData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' }
        }).success(function(data, status, headers, config) {
            console.log('success');
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            console.log('error');
            $scope.status = status;
        });

    };

};

loginCtrl.$inject = ['$scope', '$http'];
