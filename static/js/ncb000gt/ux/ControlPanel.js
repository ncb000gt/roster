Ext.namespace("ncb000gt.ux");

ncb000gt.ux.ControlPanel = function(config) {
    Ext.apply(this, config);

    ncb000gt.ux.ControlPanel.superclass.constructor.call(
	this,
	{
	    id: 'main-tabs',
	    activeTab: 0,
	    resizeTabs: true,
	    tabWidth: 150,
	    minTabWidth: 120,
	    enableTabScroll: true,
	    region: 'center',
	    plugins: new Ext.ux.TabCloseMenu(),
	    items: {
		id: 'control-panel',
		layout: 'fit',
		title: 'Control Panel',
		autoScroll: true,
		autoWidth: true,
		items: [
		    new ncb000gt.ux.ThumbnailView(
			{
			    store: this.sections_store
			}
		    )
		]
	    }
	}
    );

    this.add_tab = {
	manage_users: function(config) {
	    var panel = this.getComponent('user-management');
	    if (!panel) {
		panel = new Ext.Panel(
		    {
			title: 'User Management',
			autoScroll: true,
			layout: 'border',
			closable: true,
			id: 'user-management',
			items: [
			    new ncb000gt.users.NewUserForm(
				{
				    id: 'user-controls',
				    title: 'Add Users',
				    autoScroll: true,
				    width: 275,
				    region: 'west',
				    margins: '5 0 0 5',
				    cmargins: '5 5 0 5'
				}
			    ),
			    new ncb000gt.users.Grid(
				{
				    margins: '0 5 0 0',
				    stripeRows: true,
				    region: 'center',
				    store: this.users_store
				}
			    )
			]
		    }
		);
		this.add(panel);
	    }
	    this.setActiveTab(panel);
	},
	manage_roles: function(config) {
	    var panel = this.getComponent('role-management');
	    if (!panel) {
		panel = new Ext.Panel(
		    {
			title: 'Role Management',
			autoScroll: true,
			layout: 'border',
			closable: true,
			id: 'role-management',
			items: [
			    new ncb000gt.roles.NewRoleForm(
				{
				    title: 'Roles',
				    id: 'role-controls',
				    width: 275,
				    region: 'west',
				    margins: '5 0 0 5',
				    cmargins: '5 5 0 5',
				    autoScroll: true
				}
			    ),
			    new ncb000gt.roles.Grid(
				{
				    margins: '0 5 0 0',
				    stripeRows: true,
				    region: 'center',
				    store: this.roles_store
				}
			    )
			]
		    }
		);
		this.add(panel);
	    }
	    this.setActiveTab(panel);
	}
    };

    events.subscribe('add-tab.manage-users', this.add_tab.manage_users, this);
    events.subscribe('add-tab.manage-roles', this.add_tab.manage_roles, this);
};

Ext.extend(
    ncb000gt.ux.ControlPanel,
    Ext.TabPanel,
    {
	loadSection: function(section) {

	}
    }
);

Ext.reg('ncb000gt.ux.controlpanel', ncb000gt.ux.ControlPanel);