app.service('tagSearchService', ['$http', '$location',  function($http, $location) {
  
    var _tagSearchDataArr = [];

    var _getTagSearchData = function(mode, query, count){
        
        var url  = 'http://localhost:9292/tag/tag/'+mode+'/'+query+'/'+count+'';
        
		$http.get(url)
		.then(function(results){
			//Success
			angular.copy(results.data, _tagSearchDataArr);
		}, function(results){
			//Error
		});
    };


    return{
        tagCloud: _tagSearchDataArr,
        getTagSearchData: _getTagSearchData
    };
   
}]);