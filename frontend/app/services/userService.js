app.service('userService', ['$http', '$location',  function($http, $location) {
  
    var _tagCloudDataArr = [];

    return{
        tagCloud: _tagCloudDataArr,
        getTagCloudData: function(type, mode, count){
            var theurl  = 'http://localhost:9292/'+type+'/'+mode+'/'+count+'';
             
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);