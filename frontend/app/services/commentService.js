/* jshint -W089 */

app.service('commentService', ['$http', '$location',  function($http, $location) {

		return {

			// save a comment (pass in comment data)
			save : function(comment, currentId) {
				return $http({
					method: 'POST',
					url: 'http://localhost:9292/comment/add',
					data: {'comment': comment, 'userId': 1, 'objectId': currentId},
					transformRequest: function(obj) {
						var str = [];
						for(var p in obj) {
							str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
						}
						return str.join('&');
					},
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form
				});
			}
		};

	}]);