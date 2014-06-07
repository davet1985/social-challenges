app.service('tagCloudService', ['$http', '$location',  function($http, $location) {
  
    var _tagCloudDataArr = [];

    var _getTagCloudData = function(mode, searchString, count){
        
        var url;
        
        if (mode === 'cloud' ){
            url  = 'http://localhost:9292/tag/all';
        } else {
            url  = 'http://localhost:9292/tag/'+mode+'/'+searchString+'/'+count+'';
        }
         
        
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