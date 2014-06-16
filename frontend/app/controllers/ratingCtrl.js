/* jshint -W089 */

var ratingCtrl = function ($scope, $location, $http, ratingService, configService, commentService, $route, usernameService) {

	$scope.ratings = ratingService.ratings;
    
    ratingService.getRatingData();

    $scope.max = 3;

    var tagName = $scope.getPageTag();
	var tagType = $scope.getPageType();

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };

    $scope.getValue = function (value, prevId, currentId, nextId) {
        
        if (value !== 0) {
            $http({
                method  : 'POST',
                url     : configService.API_END_POINT+'rating/add',
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
        }
		if (nextId == null) {
			$location.path('/top/'+tagName);
		}
		else {
			$location.path('/rate/'+tagType+'/'+tagName+'/'+nextId+'/'+currentId);
		}
    };
	$scope.submitComment = function(isValid, prevId, currentId) {

		// save the comment. pass in comment data from the form
		// use the function we created in our service
		console.log($scope.comment);
		commentService.save($scope.comment, currentId, usernameService.token())
			.success(function(data) {
				$route.reload();
			})
			.error(function(data) {
				console.log(data);
			});
	};
};

ratingCtrl.$inject = ['$scope', '$location', '$http', 'ratingService', 'configService', 'commentService', '$route', 'usernameService'];