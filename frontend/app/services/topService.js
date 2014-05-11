app.service('topService', ['$http', '$location',  function($http, $location) {
  
    var _topDataArr = [];

    var _gettopData = function(){
		
		var pageTag = $location.path().split('/')[2]||'Unknown';

        var url  = 'http://localhost:9292/leaderboard/' + pageTag + '/20';
        //var url  = 'app/data/top.json';


        $http.get(url)
            .then(function(results){
                //Success
                angular.copy(results.data, _topDataArr);
            }, function(results){
                //Error
        });
    };


    return{
        top: _topDataArr,
        gettopData: _gettopData
    };
   
}]);