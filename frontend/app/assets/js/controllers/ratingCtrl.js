/* jshint -W117 */

socialChallengeApp.controller('ratingCtrl', function ($scope, ratingService){

    $scope.ratings = ratingService.ratings;

	ratingService.getRatingData();
	

/*
 $scope.random = function() {
        return 0.5 - Math.random();
    }
| orderBy:random | limitTo:1
*/

});



