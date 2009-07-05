Ext.namespace('ncb000gt.users');

ncb000gt.users.Grid = function(viewer, config) {
    this.viewer = viewer;
    var pagination = new Ext.PagingToolbar(
	{
	    pageSize: 20,
	    store: config.store,
	    displayInfo: true,
	    displayMsg: 'Displaying users {0} - {1} of {2}',
	    emptyMsg: "No users available"
	}
    );

    config.bbar = pagination;

    Ext.apply(this, config);

    events.subscribe('update-user-grid', function() { console.log('test');this.store.reload(); }, this);

    this.columns = [
	{
	    id: 'username',
	    header: 'Username',
	    dataIndex: 'username',
	    sortable: true
	},
	{
	    id: 'first_name',
	    header: 'First Name',
	    dataIndex: 'first_name',
	    sortable: true
	},
	{
	    id: 'last_name',
	    header: 'Last Name',
	    dataIndex: 'last_name',
	    sortable: true
	},
	{
	    id: 'email',
	    header: 'Email',
	    dataIndex: 'email',
	    sortable: true
	},
	{
	    id: 'created',
	    header: 'Created On',
	    dataIndex: 'created',
	    sortable: true
	}
    ];

    ncb000gt.users.Grid.superclass.constructor.call(
	this,
	{
	    region: 'center',
	    id: 'user-grid',
	    loadMask: {
		msg: 'Loading Users...'
	    },
	    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	    viewConfig: {
		forceFit: true,
		enableRowBody: false,
		showPreview: true,
		getRowClass: this.applyRowClass
	    }
	}
    );

    this.store.load();
};

Ext.extend(
    ncb000gt.users.Grid,
    Ext.grid.GridPanel,
    {
    }
);

Ext.reg('ncb000gt.users.grid', ncb000gt.users.Grid);