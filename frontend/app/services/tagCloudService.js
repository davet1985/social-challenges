app.service('tagCloudService', ['$http', '$location',  function($http, $location) {
  
    var _tagCloudDataArr = [];

    var _getTagCloudData = function(type, mode, searchString, count){
        
        var url;
        
        if (mode === 'cloud' ){
            url  = 'http://localhost:9292/tag/all';
        } else {
            url  = 'http://localhost:9292/tag/'+type+'/'+mode+'/'+searchString+'/'+count+'';
        }
         
        
        $http.get(url)
        .success(function(data) {
			angular.copy(data, _tagCloudDataArr);
        });
    };


    return{
        tagCloud: _tagCloudDataArr,
        getTagCloudData: _getTagCloudData
    };
   
}]);