app.service('tagCloudRecentService', ['$http', '$location',  function($http, $location) {
  
    var _tagCloudRecentDataArr = [];

    var _getTagCloudRecentData = function(type, mode, searchString, count){
                

        var url  = 'http://localhost:9292/tag/'+type+'/'+mode+'/'+searchString+'/'+count+'';
    
             
		$http.get(url)
		.then(function(results){
			//Success
			angular.copy(results.data, _tagCloudRecentDataArr);
		}, function(results){
			//Error
		});
    };


    return{
        tagCloud: _tagCloudRecentDataArr,
        getTagCloudRecentData: _getTagCloudRecentData
    };
   
}]);