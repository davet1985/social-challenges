app.service('usernameService', ['$cookies', function($cookies) {

    var username = '';

    return{
        username: function() { return $cookies.username; },
		setUsername: function(newUsername) { $cookies.username = newUsername; }
    };
   
}]);