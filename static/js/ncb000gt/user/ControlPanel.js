var ControlPanel = function(config) {
    Ext.apply(this, config);

    ControlPanel.superclass.constructor.call(
	this,
	{
	    id: 'user-controls',
	    title: 'User Controls',
	    layout: 'accordion',
	    layoutConfig: {
		animate: true
	    },
	    items: [
		new NewUserForm(
		    {
			autoScroll: true
		    }
		)
	    ]
	}
    );
};

Ext.extend(
    ControlPanel,
    Ext.Panel,
    {
    }
);

Ext.reg('ncb000gt.user.controlpanel', ControlPanel);