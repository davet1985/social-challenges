app.service('tagSearchService', ['$http', '$location',  function($http, $location) {
  
    var _tagSearchDataArr = [];

    return{
        tagCloud: _tagSearchDataArr,
        getTagSearchData: function(type, mode, searchString, count){
        
            var theurl  = 'http://localhost:9292/tag/'+type+'/'+mode+'/'+searchString+'/'+count+'';
            
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);