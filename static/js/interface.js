var events = null;

Ext.onReady(
    function() {
	events = new Axiom.EventManager();

	var store = new Ext.data.JsonStore(
	    {
		totalProperty: 'numRows',
		root: 'items',
		url: '/users_json',
		fields: [
		    'username',
		    'first_name',
		    'last_name',
		    'email',
		    'created'
		],
		remoteSort: true
	    }
	);

	store.setDefaultSort('username', 'ASC');

	var border = new Ext.Viewport(
	    {
		el: 'content_pane',
		layout:'border',
		items: [
		    new Ext.BoxComponent(
			{
			    region:'north',
			    el: 'header',
			    height:37
			}
		    ),
		    new ControlPanel(
			{
			    region:'west',
			    margins: '5 0 0 5',
			    cmargins: '5 5 0 5',
			    width: 275
			}
		    ),
		    new Grid(
			this,
			{
			    title: 'Users',
			    region:'center',
			    margins: '0 5 0 0',
			    width: '70%',
			    store: store,
			    stripeRows: true
			}
		    )
		]
	    }
	);
    }
);