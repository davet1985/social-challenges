/* jshint -W079 */

var app = angular.module('app', [
    'ngRoute',
    'ui.bootstrap',
    'ngTagsInput',
    'angularFileUpload'
])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider,  $locationProvider) {

    $routeProvider
        .when('/',{
            templateUrl: 'app/views/ratingView.html',
            controller: 'ratingCtrl'
        })
        .when('/:tag/:id/:prevId',{
            templateUrl: 'app/views/ratingView.html',
            controller: 'ratingCtrl'
        })
        .when('/login',{
            templateUrl: 'app/views/loginView.html',
            controller: 'loginCtrl'
        })
        .when('/signup',{
            templateUrl: 'app/views/signupView.html',
            controller: 'signupCtrl'
        })
        .when('/forgot',{
            templateUrl: 'app/views/forgotView.html',
            controller: 'forgotCtrl'
        })
        .when('/upload',{
            templateUrl: 'app/views/uploadView.html',
            controller: 'uploadCtrl'
        })
        .when('/404',{
            templateUrl: 'app/views/404View.html',
            controller: 'errorCtrl'
        })
        .otherwise({'redirectTo': '/404'});

    $locationProvider
    .html5Mode(false)
    .hashPrefix('!');

}]);



// Some general UI pack related JS

$(function() {
  
    // Placeholders for input/textarea
    $(':text, textarea').placeholder();

});
  