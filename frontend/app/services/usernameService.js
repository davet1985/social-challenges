app.service('usernameService', ['$cookies', function($cookies) {

    var username = '';

    return{
        username: function() { return $cookies.username; },
		id: function() { return $cookies.id; },
		token: function() { return $cookies.token; },
		setUsername: function(newUsername, id, token) { $cookies.username = newUsername; $cookies.id = id; $cookies.token = token; }
    };
   
}]);