app.service('usernameService', ['$cookies', function($cookies) {

    var username = '';

    return{
        username: function() { return $cookies.username; },
		id: function() { return $cookies.id; },
		setUsername: function(newUsername, id) { $cookies.username = newUsername; $cookies.id = id; }
    };
   
}]);