app.service('userCloudService', ['$http', '$location',  function($http, $location) {
  
    var _tagCloudDataArr = [];

    return{
        tagCloud: _tagCloudDataArr,
        getTagCloudData: function(type, mode, searchString, count){
            //TODO: swap tag : user in backend around to make consistant
            var theurl  = 'http://localhost:9292/'+type+'/user/'+mode+'/'+searchString+'/'+count+'';
             
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);