app.service('tagCloudService', ['$http', '$location',  function($http, $location) {
  
    var _tagCloudDataArr = [];

    var _getTagCloudData = function(){

        var url  = 'http://localhost:9292/tag/all';

        //var url  = 'app/data/tag_cloud.json';
        
        $http.get(url)
            .then(function(results){
                //Success
                angular.copy(results.data, _tagCloudDataArr);
            }, function(results){
                //Error
        });
    };


    return{
        tagCloud: _tagCloudDataArr,
        getTagCloudData: _getTagCloudData
    };
   
}]);