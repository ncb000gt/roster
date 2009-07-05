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
		    new ncb000gt.ux.ControlPanel(
			{
			    viewer: this,
			    users_store: store,
			    sections_store: new Ext.data.JsonStore(
				{
				    idProperty: 'title',
				    fields: ['id', 'title', 'items'],
				    url: '/getSections'
				}
			    )
			}
		    )
		]
	    }
	);
    }
);