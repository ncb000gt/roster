function setPassword(password) {
    var salt = hash.generate_salt();
    this.salt = salt;
    this.password = hash.to_base64(hash.encode(password, salt));
}

function hasRole(role) {
    if (this.roles) {
	var roles = app.getObjects('Role', {name: role});
	return app.getTargets(this, 'Role').contains(roles[0]);
    }

    return false;
}