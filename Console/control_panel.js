function getSections() {
    return [
	{
	    title: 'Default',
	    items: [
		{
		    id: 'manage-users',
		    title: 'Manage Users',
		    icon: '/static/images/config_users.png',
		    desc: 'View, edit, add, and remove users.'
		},
		{
		    id: 'manage-roles',
		    title: 'Manage Roles',
		    icon: '/static/images/config_roles.png',
		    desc: 'Manage roles and the persmissions associated with those roles.'
		}
	    ]
	}
    ];
}

function login() {
    var username = req.get('username');
    var password = req.get('password');
    var postback = req.get('postback');
    var came_from = req.get('came_from') || 'http://'+req.data.http_host+'/roster';

    var message = null;

    if (username && password) {
	var user = roster.authenticate(username, password);
	if (user) {
	    roster.login(user);
	    res.redirect(came_from);
	}
	message = "Login attempt failed. Could not find a user with that username/password combination.";
    } else if (postback) {
	message = "Need more information. Please fill out all fields.";
    }

    return this.login_form({message: message});
}

function logout() {
    roster.logout();
}