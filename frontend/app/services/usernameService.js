app.service('usernameService', [function() {

    var username = '';

    return{
        username: function() { return username; },
		setUsername: function(newUsername) { username = newUsername; }
    };
   
}]);