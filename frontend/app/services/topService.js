app.service('topService', ['$http', '$location',  function($http, $location) {
  
    var _topDataArr = [];

    var _gettopData = function(){

        //var url  = 'http://localhost:9292/tag/all';
        var url  = 'app/data/top.json';


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