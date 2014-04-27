socialChallengeApp.factory('ratingService', function($http){
    var _ratingDataArr = [];

    var _getRatingData = function(){
        $http.get('assets/data/ratings.json')
            .then(function(results){
                //Success
                angular.copy(results.data, _ratingDataArr); //this is the preferred; instead of $scope.movies = result.data
            }, function(results){
                //Error
        });
    };

    return{
        ratings: _ratingDataArr,
        getRatingData: _getRatingData
    };


});