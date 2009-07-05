function getSections() {
    return [
	{
	    title: 'Default',
	    items: [
		{
		    id: 'manage-users',
		    title: 'Manage Users',
		    icon: '/static/images/config_users.png',
		    desc: 'View, edit, add, and remove users.'
		},
		{
		    id: 'manage-roles',
		    title: 'Manage Roles',
		    icon: '/static/images/config_roles.png',
		    desc: 'Manage roles and the persmissions associated with those roles.'
		}
	    ]
	}
    ];
}