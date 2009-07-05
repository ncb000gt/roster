Ext.namespace("ncb000gt.roles");

ncb000gt.roles.ControlPanel = function(config) {
    Ext.apply(this, config);

    ncb000gt.roles.ControlPanel.superclass.constructor.call(
	this,
	{
	    id: 'role-controls',
	    title: 'Roles',
	    items: [
		new ncb000gt.roles.NewRoleForm(
		    {
			autoScroll: true
		    }
		)
	    ]
	}
    );
};

Ext.extend(
    ncb000gt.roles.ControlPanel,
    Ext.form.FormPanel,
    {
    }
);

Ext.reg('ncb000gt.roles.controlpanel', ncb000gt.roles.ControlPanel);