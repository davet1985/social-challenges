/* jshint -W089 */

app.service('ratingService', ['$http', '$location',  function($http, $location) {
  
    var _ratingDataArr = [];
	
	var ignore_ids = [];

    var _getRatingData = function(){

        var pageTag,
        pageId,
        prevId;
        
        if($location.path().split('/')[1] === 'video'){

            pageTag = $location.path().split('/')[3]||'Unknown';
            pageId  = $location.path().split('/')[4]||'Unknown';
            prevId  = $location.path().split('/')[5]||'Unknown';
        } else{
            pageTag = $location.path().split('/')[2]||'Unknown';
            pageId  = $location.path().split('/')[3]||'Unknown';
            prevId  = $location.path().split('/')[4]||'Unknown';

        }

        var url  = 'http://localhost:9292/tag/';
		
		var urlWithCurrentAndPrev = url + pageTag;
		
		if (pageId !== 'Unknown') {
			urlWithCurrentAndPrev = urlWithCurrentAndPrev + '/' + pageId;
			if (ignore_ids.indexOf(pageId) === -1) {
				ignore_ids.push(pageId);
			}
		}
		
		if (prevId !== 'Unknown') {
			urlWithCurrentAndPrev = urlWithCurrentAndPrev + '/' + prevId;
			if (ignore_ids.indexOf(prevId) === -1) {
				ignore_ids.push(prevId);
			}
		}
			
		
		//console.log(urlWithCurrentAndPrev);

        $http({
            method  : 'POST',
            url     : urlWithCurrentAndPrev,
            data: {'ignoreIds': ignore_ids},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            },
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
            .then(function(results){
                //Success
                angular.copy(results.data, _ratingDataArr);
            }, function(results){
                //Error
                $location.path( '/top/' + pageTag );
            });
    };
    
    return{
        ratings: _ratingDataArr,
        getRatingData: _getRatingData
    };
    
   
}]);