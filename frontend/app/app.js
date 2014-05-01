/* jshint -W079 */

var app = angular.module('app', ['ngRoute','ui.bootstrap', 'ngTagsInput', 'angularFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/',{
            controller: 'ratingCtrl',
            templateUrl: 'app/views/ratingView.html'
        })
        .when('/login',{
            controller: 'loginCtrl',
            templateUrl: 'app/views/loginView.html'
        })
        .when('/upload',{
            controller: 'uploadCtrl',
            templateUrl: 'app/views/uploadView.html'
        })
        .otherwise({'redirectTo': '/'});
}]);



// Some general UI pack related JS

$(function() {
  
    // Placeholders for input/textarea
    $(':text, textarea').placeholder();

});
  