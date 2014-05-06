var loginCtrl = function ($scope, $http) {

    $scope.attemptLogin = function() {

        $http({
            url: 'http://localhost:9393/auth/login',
            method: 'POST',
            data: {'foo':'bar'},
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        });

    };

};

loginCtrl.$inject = ['$scope', '$http'];
