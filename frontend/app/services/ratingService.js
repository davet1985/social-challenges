app.factory('ratingService', ['$http', '$location', function($http, $location) {
  
    var _ratingDataArr = [];

    var _getRatingData = function(){
        
        $http.get('app/data/ratings.json')
            .then(function(results){
                //Success
                angular.copy(results.data, _ratingDataArr);
            }, function(results){
                //Error
        });
    };

    return{
        ratings: _ratingDataArr,
        getRatingData: _getRatingData
    };


}]);