/* jshint -W079 */

var app = angular.module('app', ['ngRoute','ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/',{
            controller: 'ratingCtrl',
            templateUrl: 'views/ratingView.html'
        })
        .when('/upload',{
            controller: 'uploadCtrl',
            templateUrl: 'views/uploadView.html'
        })
        .otherwise({'redirectTo': '/'});
}]);