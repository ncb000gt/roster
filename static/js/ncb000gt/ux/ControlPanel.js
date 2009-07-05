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

    this.add_tab = function(config) {
	var panel = new Ext.Panel(
	    {
		title: 'User Management',
		autoScroll: true,
		layout: 'border',
		closable: true,
		id: 'user-management',
		items: [
		    new ncb000gt.users.ControlPanel(
			{
			    width: 275,
			    region: 'west',
			    margins: '5 0 0 5',
			    cmargins: '5 5 0 5'
			}
		    ),
		    new ncb000gt.users.Grid(
			this.viewer,
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
	this.activate(panel);
    };

    events.subscribe('add-tab', this.add_tab, this);
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