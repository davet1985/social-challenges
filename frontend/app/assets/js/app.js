/* jshint -W079 */

var app = angular.module('app', ['ngRoute','ui.bootstrap']);

//Do configuration and routing here
app.config(function($routeProvider){
    //console.log($routeProvider);
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
});