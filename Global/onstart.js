function roster_initialize() {
    app.log('Roster Initialization');

    var ub = root.get('user_bucket');
    if (!ub) {
	ub = new UserBucket();
	ub.id = 'user_bucket';
	root.add(ub);
    }

    app.addRewriteRule('/manage_roster', '/manage_roster');
    app.addRewriteRule('/users_json', '/users_json');

    app.log('Roster Initialization Complete');
}