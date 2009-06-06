function setPassword(password) {
    var salt = hash.generate_salt();
    this.salt = salt;
    this.password = hash.encode_password(password, salt);
}

function hasRole(role) {
    if (this.roles) {
	return this.roles.contains(role);
    }

    return false;
}