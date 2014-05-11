/* jshint -W089 */

var ratingCtrl = function ($scope, $location, $http, ratingService) {

    $scope.ratings = ratingService.ratings;
    
    ratingService.getRatingData();

	$scope.max = 5;

	var tagName = $scope.getPageTag();

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	// do something with value
	$scope.getValue = function (value, prevId, currentId, nextId) {
        $http({
            method  : 'POST',
            url     : 'http://localhost:9292/rating/add',
            data: {'userId': '1', 'againstTag': tagName, 'objectId': currentId, 'score': value},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            },
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        });
		$location.path('/tag/'+tagName+'/'+nextId+'/'+currentId);
	};

};

ratingCtrl.$inject = ['$scope', '$location', '$http', 'ratingService'];
