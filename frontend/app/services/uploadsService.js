app.service('uploadsService', ['$http', '$location',  function($http, $location) {
  
    var _uploadsDataArr = [];

    return {
        uploads: _uploadsDataArr,
        getUploadsData: function(type, mode, searchString, count){
        
            var theurl  = 'http://localhost:9292/upload/'+type+'/'+mode+'/'+searchString+'/'+count+'';
             
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);