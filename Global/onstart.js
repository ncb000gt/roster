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
	var response = roster.create_user(
	    {
		username: 'admin',
		password: 'changeme',
		role: 'Administrator'
	    }
	);
	
	if (!(response.created)) {
	    app.log('Failed to create user admin.');
	}
    }

    app.log('Roster Initialization Complete');
}