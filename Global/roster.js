global.roster = {
    /**
     * Authenticates the user with the password. This does not log the user into the site.
     * This does use the generated salt for the user.
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
    },
    /**
     * Creates users
     *
     * <code>
     * roster.create_user('ncb000gt','Nick','Campbell','test','my@email.com', ['Role1','Role2']);
     * </code>
     *
     * @param {String} username
     * @param {String} first_name
     * @param {String} last_name
     * @param {String} password
     * @param {String} email
     * @return {Object} The following schema is returned:
     *                  {created: {boolean},
     *                   message: "",
     *                   user: {}}
     */
    create_user: function(username, first_name, last_name, password, email, role, add_to) {
	var config = username;

	if (!username || !(first_name && last_name && password && email)) {
	    if (!config || !(config.username && config.password && config.first_name && config.last_name && config.email)) {
		return {
		    created: false,
		    message: 'Invalid Information supplied',
		    user: null
		};
	    } else {
		if (config.role) {
		    role = config.role;
		    delete config.role;
		}
		if (config.add_to) {
		    add_to = config.add_to;
		    delete config.add_to;
		}
	    }
	} else {
	    config = {
		username: username,
		password: password,
		first_name: first_name,
		last_name: last_name,
		email: email
	    };
	}

	var users = app.getObjects('User', {username: username}, {polymorphic:true});
	var user = null;

	if (users && users.length > 0) {
	    user = users[0];
	    return {
		created: false,
		message: 'User already exists.',
		user: user
	    };
	}

	user = new User();
	for (var p in config) {
	    if (p == 'password') {
		var pw = roster.hash_password(config[p]);
		user.salt = pw.salt;
		config[p] = pw.password;
	    }
	    user[p] = config[p];
	}
	if (add_to) {
	    add_to.add(user);
	} else {
	    var bucket = app.getObjects('Bucket')[0];
	    bucket.add(user);
	}

	if (role) {
	    roster.add_role(user, role);
	}

	return {
	    created: true,
	    message: 'Successfully created the user.',
	    user: user
	};
    },
    /**
     *
     */
    hash_password: function(pw, salt) {
	salt = salt || hash.generate_salt();
	pw = hash.to_base64(hash.encode(pw, salt, 1000, 'SHA-256'));

	return {
	    salt: salt,
	    password: pw
	};
    },
    /**
     * Delete a user from the system with a specified username.
     *
     * @param {String} username
     * @return {Object} deleted - [true|false] and a message with details
     */
    delete_user: function(username) {
	if (!username) {
	    return {
		deleted: false,
		message: 'No username specified.'
	    };
	}

	var user = app.getObjects('User', {username: username}, {polymorphic: true});
	if (user.length === 0) {
	    return {
		deleted: false,
		message: 'No user found.'
	    };
	}

	user[0].del();
	return {
	    deleted:true,
	    message: 'User "'+username+'" was deleted.'
	};
    },
    /**
     * Get all roles from the system as a Hits object.
     *
     * @param {Object} sort
     * @return {Hits} Hits to the role objects. Still need to use objects() to deref.
     */
    get_all_roles: function(sort) {
	var options = {polymorphic:true};
	if (sort) {
	    options.sort = sort;
	}

	return app.getHits('Role', {}, options);
    },
    /**
     *
     */
    add_role: function(user, role) {
	try {
	    var db_roles = app.getHits('Role', {name: role});
	    if (db_roles.length == 0) {
		var new_role = new Role();
		new_role.name = role;
		root.get('role_bucket').add(new_role);
		role = new_role;
	    } else {
		role = db_roles.objects(0,1)[0];
	    }

	    if (user.roles) {
		user.roles = user.roles.concat(new MultiValue(new Reference(role)));
	    } else {
		user.roles = new MultiValue(new Reference(role));
	    }
	} catch (e) {
	    app.log(e);
	    return false;
	}
	return true;
    }
};