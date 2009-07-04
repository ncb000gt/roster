var Grid = function(viewer, config) {
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

    Grid.superclass.constructor.call(
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
    Grid,
    Ext.grid.GridPanel,
    {
    }
);

Ext.reg('ncb000gt.user.grid', Grid);