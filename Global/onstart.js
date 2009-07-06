function roster_initialize() {
    app.log('Roster Initialization');

    app.log('Creating Objects Needed for Operations');
    var ub = root.get('user_bucket');
    if (!ub) {
	ub = new Bucket();
	ub.id = 'user_bucket';
	root.add(ub);
    }

    var rb = root.get('role_bucket');
    if (!rb) {
	rb = new Bucket();
	rb.id = 'role_bucket';
	root.add(rb);
    }

    app.log('Adding rewrite rules.');
    app.addRewriteRule('/manage_roster', '/manage_roster');
    app.addRewriteRule('/users_json', '/users_json');
    app.addRewriteRule('/roles_json', '/roles_json');
    app.addRewriteRule('/getSections', '/getSections');

    app.log('Roster Initialization Complete');
}