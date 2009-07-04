function users_json() {
    var size = parseInt((req.get('limit') || 20), 10);
    var start = parseInt((req.get('start') || 0), 10);
    var sort = req.get('sort') || 'username';
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
		    created: e.created().format("yyyy/MM/dd")
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

    if (username && password && first_name && last_name && email) {
	return {status: 1, message: "Completed successfully."};
    } else {
	return {status: -1, message: "Need more information."};
    }
}