/* jshint -W079 */

var app = angular.module('app', ['ngRoute','ui.bootstrap', 'ngTagsInput', 'angularFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/' || '/next/:id',{
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
        .otherwise({'redirectTo': '/'});
}]);



// Some general UI pack related JS

$(function() {
  
    // Placeholders for input/textarea
    $(':text, textarea').placeholder();

});
  