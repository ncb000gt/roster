function login() {
    var username = req.get('username');
    var password = req.get('password');
    var postback = req.get('postback');
    var came_from = req.get('came_from') || 'http://'+req.data.http_host+'/roster';

    var message = null;

    if (postback && username && password) {
	var user = roster.authenticate(username, password);
	if (user) {
	    roster.login(user);
	    res.redirect(came_from);
	}
	message = "Login attempt failed. Could not find a user with that username/password combination.";
    } else if (postback) {
	message = "Need more information. Please fill out all fields.";
    }

    var data = {};

    if (get_globals) {
	data = get_globals();
    }

    if (message) {
	data.message = message;
    }

    if (this instanceof Console) {
	data.is_roster = true;
    }

    if (this.login_form) {
	data.render = this.login_form(data);
    }

    return this.wrap(data);
}

function logout() {
    roster.logout();
    res.redirect(this.getURI());
}