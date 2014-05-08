app.service('ratingService', ['$http', '$location',  function($http, $location) {
  
    var _ratingDataArr = [];

    var _getRatingData = function(){
        
    
        var pageTag = $location.path().split('/')[1]||'Unknown';
        var pageId  = $location.path().split('/')[2]||'Unknown';
		var prevId  = $location.path().split('/')[3]||'Unknown';

        var url  = 'http://localhost:9292/tag/';
		
		var urlWithCurrentAndPrev = url + pageTag + '/' + pageId + '/' + prevId;
		
		console.log(urlWithCurrentAndPrev);

        $http.get(urlWithCurrentAndPrev)
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