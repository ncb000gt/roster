function roster_initialize() {
    app.log('Roster Initialization');

    app.log('Creating Objects Needed for Operations');
    var console = root.get('roster');
    if (!console) {
	console = new Console();
	console.id = 'roster';
	root.add(console);
    }

    var ub = console.get('user_bucket');
    if (!ub) {
	ub = new Bucket();
	ub.id = 'user_bucket';
	console.add(ub);
    }

    var rb = console.get('role_bucket');
    if (!rb) {
	rb = new Bucket();
	rb.id = 'role_bucket';
	console.add(rb);
    }

    app.log('Roster Initialization Complete');
}