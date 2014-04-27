/* jshint -W079 */

var socialChallengeApp = angular.module('socialChallengeApp', ['ngRoute','ui.bootstrap']);

//Do configuration and routing here
socialChallengeApp.config(function($routeProvider){
    console.log($routeProvider);
    $routeProvider
        .when('/',{
            controller: 'ratingCtrl',
            templateUrl: 'views/ratingView.html'
        });

    $routeProvider.otherwise({'redirectTo': '/'});  //.otherwise("/"); //does not work
});