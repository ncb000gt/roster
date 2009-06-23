function users_json() {
    return {
	identifier: 'username',
	label: 'username',
	items: roster.get_users()
    };
}