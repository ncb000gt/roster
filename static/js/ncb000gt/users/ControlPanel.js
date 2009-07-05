Ext.namespace("ncb000gt.users");

ncb000gt.users.ControlPanel = function(config) {
    Ext.apply(this, config);

    ncb000gt.users.ControlPanel.superclass.constructor.call(
	this,
	{
	    id: 'user-controls',
	    title: 'Add Users',
	    items: [
		new ncb000gt.users.NewUserForm(
		    {
			autoScroll: true
		    }
		)
	    ]
	}
    );
};

Ext.extend(
    ncb000gt.users.ControlPanel,
    Ext.Panel,
    {
    }
);

Ext.reg('ncb000gt.users.controlpanel', ncb000gt.users.ControlPanel);