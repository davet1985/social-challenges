/* jshint -W079 */

var app = angular.module('app', [
    'ngRoute',
    'ui.bootstrap',
    'ngTagsInput',
    'angularFileUpload',
    'ui.gravatar'
])
    .config([
        '$routeProvider',
        '$locationProvider',
        'gravatarServiceProvider',
        
        function (
            $routeProvider,
            $locationProvider,
            gravatarServiceProvider
            ){

            $routeProvider
                .when('/',{
                    redirectTo: '/tag/cat', /* todo: make it go to a random tag or most popular? */
                    templateUrl: 'app/views/ratingView.html',
                    controller: 'ratingCtrl'
                })
                .when('/tag/:tag/:id/:prevId',{
                    templateUrl: 'app/views/ratingView.html',
                    controller: 'ratingCtrl'
                })
				.when('/tag/:tag',{
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
                    controller: 'fileUploadCtrl'
                })
                .when('/top/:tag',{
                    templateUrl: 'app/views/topView.html',
                    controller: 'topCtrl'
                })
                .when('/user/:userName/uploads/:uploadId',{
                    templateUrl: 'app/views/userUploadsView.html',
                    controller: 'displayUploadCtrl'
                })
                .when('/404',{
                    templateUrl: 'app/views/404View.html',
                    controller: 'errorCtrl'
                })
                .otherwise({'redirectTo': '/404'});

            $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

            gravatarServiceProvider.defaults = {
                size     : 80,
                'default': 'mm'  // Mystery man as default for missing avatars
            };

            gravatarServiceProvider.secure = true;

        }
    ]);

// Some general UI pack related JS

$(function() {
  
    // Placeholders for input/textarea
    $(':text, textarea').placeholder();

});
  