function users_json() {
    var size = parseInt((req.get('limit') || 20), 10);
    var start = parseInt((req.get('start') || 0), 10);
    var sort = req.get('sort') || 'username';
    if (sort == 'created')
	sort = '_created';
    var sortOrder = (req.get('dir') || 'asc').toLowerCase();
    var role = req.get('role');

    var sort_opt = {};
    sort_opt[sort] = sortOrder;

    var users = roster.get_users(role, sort_opt);

    return {
	numRows: users.total,
	items: users.objects(start, size).map(
	    function(e) {
		return {
		    username: e.username,
		    email: e.email,
		    last_name: e.last_name,
		    first_name: e.first_name,
		    created: e._created.format("yyyy/MM/dd")
		};
	    }
	)
    };
}

function roles_json() {
    var size = parseInt((req.get('limit') || 20), 10);
    var start = parseInt((req.get('start') || 0), 10);
    var sort = req.get('sort') || 'name';
    if (sort == 'created')
	sort = '_created';
    var sortOrder = (req.get('dir') || 'asc').toLowerCase();
    var role = req.get('role');

    var sort_opt = {};
    sort_opt[sort] = sortOrder;

    var roles = roster.get_all_roles(sort_opt);

    return {
	numRows: roles.total,
	items: roles.objects(start, size).map(
	    function(e) {
		return {
		    role: e.name,
		    created: e._created.format("yyyy/MM/dd"),
		    num_users: app.getSources(e, 'User').length
		};
	    }
	)
    };
}

function add_user() {
    var username = req.get('username');
    var password = req.get('password');
    var first_name = req.get('first_name');
    var last_name = req.get('last_name');
    var email = req.get('email');
    var role = req.get('role');

    if (username && password && first_name && last_name && email) {
      var add_to = null;
      if(this.add_to)
	add_to = this.add_to();
	var result = roster.create_user(username, first_name, last_name, password, email, role, add_to);
	if (result.created) {
	    return {status: 1, message: result.message};
	} else {
	    return {status: -1, message: result.message};
	}
    } else {
	return {status: -1, message: "Need more information."};
    }
}

function delete_user() {
    var username = req.get('username');

    if (username) {
	var result = roster.delete_user(username);
	if (result.deleted) {
	    return {status: 1, message: result.message};
	} else {
	    return {status: -1, message: result.message};
	}
    } else {
	return {status: -1, message: "Need more information."};
    }
}