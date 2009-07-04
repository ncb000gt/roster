Ext.onReady(
    function() {
	var store = new Ext.data.JsonStore(
	    {
		totalProperty: 'numRows',
		root: 'items',
		url: '/users_json',
		fields: [
		    'username',
		    'first_name',
		    'last_name',
		    'email'
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
		    {
			title: 'Controls',
			id: 'west-panel',
			region:'west',
			margins: '5 0 0 5',
			cmargins: '5 5 0 5',
			width: 200,
			minSize: 100,
			maxSize: 300,
			split: true
		    },
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