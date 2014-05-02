/* jshint -W079 */

var app = angular.module('app', ['ngRoute','ui.bootstrap', 'ngTagsInput', 'angularFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/',{
            templateUrl: 'app/views/ratingView.html',
            controller: 'ratingCtrl'
        })
        .when('/login',{
            templateUrl: 'app/views/loginView.html',
            controller: 'loginCtrl'
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
  