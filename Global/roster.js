global.roster = {
    /**
     * Authenticates the user with the password. This does not log the user into the site.
     *
     * <code>
     * var user = inn.authenticate('me','password');
     * if (user) {
     *     roster.login(user);
     *     return 'Login success. Hip Hip Hooray!';
     * } else {
     *     return 'Failboat. Credentials do not match.';
     * }
     * </code>
     *
     * @param {String} username
     * @param {String} password
     * @return {Object} returns user object if found, otherwise, null.
     */
    authenticate: function(username, password) {
	var users = app.getObjects('User', {username: username}, {polymorphic:true});
	if (users.length > 0) {
	    var user = users[0];
	    if (user.password == hash.to_base64(hash.encode(password, user.salt))) {
		return user;
	    }
	}

	return null;
    },
    /**
     * Attaches the Object to the Session.
     *
     * <code>
     * if (roster.login(user))
     *     return 'Win.';
     * else
     *     return 'Fail.';
     * </code>
     *
     * @param {Object} user
     * @return {Boolean} Success or failure.
     */
    login: function(user) {
	try {
	    session.login(user);
	    return true;
	} catch (e) {
	    app.log('Could not log user in. Message: ' + e.getMessage());
	}
	return false;
    },
    /**
     * Detaches the logged in Object from the Session.
     *
     * <code>
     * if (roster.logout())
     *     return 'Win.';
     * else
     *     return 'Fail.';
     * </code>
     *
     * @return {Boolean} Success or failure.
     */
    logout: function() {
	try {
	    session.logout();
	    return true;
	} catch (e) {
	    app.log('Could not logout. Message: ' + e.getMessage());
	}
	return false;
    },
    /**
     * Searches for all users in the datasource that have the role specified.
     * If no role is specified then all users are returned.
     *
     * <code>
     * app.log('Administrators');
     * app.log('--------------');
     * for each(var user in roster.get_users('Administrator')) {
     *     app.log(user.username);
     * }
     * </code>
     *
     * @param {String} role - optional
     * @return {Array} An array of {User} objects.
     */
    get_users: function(role, sort) {
	var filter = {};
	if (role) {
	    filter.roles = role;
	}
	var options = {polymorphic:true};
	if (sort) {
	    options.sort = sort;
	}

	return app.getHits('User', filter, options);
    }
};