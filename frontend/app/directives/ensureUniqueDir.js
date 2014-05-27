/* jshint -W089 */
app.directive('ensureUnique', ['$http', 'configService', '$location', function($http, configService, $location) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {
                $http({
                    method: 'POST',
                    url: configService.API_END_POINT+'auth/check/'+attrs.ensureUnique,
                    data: {
                        'field': attrs.ensureUnique
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj) {
                            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                        }
                        return str.join('&');
                    },
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data, status, headers, cfg) {
                    c.$setValidity('unique', data.isUnique);
                    console.log(data);
                })
                .error(function(data, status, headers, cfg) {
                    c.$setValidity('unique', false);
                    console.log('error '+data);
                });
            });
        }
    };
}]);