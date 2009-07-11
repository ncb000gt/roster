function roster_initialize() {
    app.log('Roster Initialization');

    app.log('Creating Objects Needed for Operations');
    var console = root.get('roster');
    if (!console) {
	console = new Console();
	console.id = 'roster';
	root.add(console);
    }

    var rb = console.get('role_bucket');
    if (!rb) {
	rb = new Bucket();
	rb.id = 'role_bucket';
	console.add(rb);
    }

    var admin = rb.get('administrator');
    if (!admin) {
	admin = new Role();
	admin.name = "Administrator";
	rb.add(admin);
    }

    var ub = console.get('user_bucket');
    if (!ub) {
	ub = new Bucket();
	ub.id = 'user_bucket';
	console.add(ub);
    }

    var user = app.getHits('User', {});
    if (user.length === 0) {
	user = new User();
	user.username = 'admin';
	var pw = roster.hash_password('changeme');
	user.salt = pw.salt;
	user.password = pw.password;
	user.roles = new MultiValue(new Reference(admin));
	ub.add(user);
    }

    app.log('Apply rewrite rules');
    app.addRewriteRule('/roster', '/roster');

    app.log('Roster Initialization Complete');
}