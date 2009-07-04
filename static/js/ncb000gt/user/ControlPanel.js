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
		new NewUserForm()
	    ]
	}
    );
};