app.service('ratingService', ['$http', '$location',  function($http, $location) {
  
    var _ratingDataArr = [];

    var _getRatingData = function(){
        
    /*
  
        $http.get('app/data/ratings2.json')
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
    
    */


    
        //var pageTag = $location.path().split('/')[1]||'Unknown';
        var pageId  = $location.path().split('/')[2]||'Unknown';

        var url  = 'http://localhost:9292/tag/';

        $http.get(url+pageId)
            .then(function(results){
                //Success
                angular.copy(results.data, _ratingDataArr);
            }, function(results){
                //Error
                $location.path( '/404' );
            });
    };
    
    return{
        ratings: _ratingDataArr,
        getRatingData: _getRatingData
    };
    
   
}]);