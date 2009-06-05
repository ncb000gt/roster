importPackage(Packages.org.acegisecurity.providers.encoding);

function setPassword(pw, strength, salt) {
    strength = strength || 256;
    if (typeof strength != 'number') {
	try {
	    strength = parseInt(str, 10);
	} catch (e) {
	    app.log('Error: Strength parameter is not a number. Setting strength to 256. ' + e);
	    strength = 256;
	}
    }

    salt = salt || "";

    var encoder = new ShaPasswordEncoder(strength);
    this.password = encoder.encodePassword(pw);
}

function hasRole(role) {
    if (this.roles) {
	return this.roles.contains(role);
    }

    return false;
}