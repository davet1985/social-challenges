app.service('displayUploadService', ['$http', '$location',  function($http, $location) {
  
    var _displayUploadDataArr = [];

    var _getDisplayUploadData = function(){
		
        var tagId = $location.path().split('/')[4]||'Unknown';


        var url  = 'http://localhost:9292/upload/'+tagId+'';
        //var url  = 'app/data/displayUpload.json';

        $http.get(url)
            .then(function(results){
                //Success
                angular.copy(results.data, _displayUploadDataArr);
            }, function(results){
                //Error
        });
    };


    return{
        displayUpload: _displayUploadDataArr,
        getDisplayUploadData: _getDisplayUploadData
    };
   
}]);