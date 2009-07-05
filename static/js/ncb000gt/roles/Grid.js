Ext.namespace('ncb000gt.roles');

ncb000gt.roles.Grid = function(config) {
    Ext.apply(this, config);

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

    events.subscribe('update-user-grid', function() { console.log('test');this.store.reload(); }, this);

    this.columns = [
	{
	    id: 'role',
	    header: 'Role',
	    dataIndex: 'role',
	    sortable: true
	},
	{
	    id: 'created',
	    header: 'Created On',
	    dataIndex: 'created',
	    sortable: true
	},
	{
	    id: 'num_users',
	    header: 'Number of Users',
	    dataIndex: 'num_users',
	    sortable: true
	}
    ];

    ncb000gt.roles.Grid.superclass.constructor.call(
	this,
	{
	    region: 'center',
	    id: 'role-grid',
	    loadMask: {
		msg: 'Loading Roles...'
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
    ncb000gt.roles.Grid,
    Ext.grid.GridPanel,
    {
    }
);

Ext.reg('ncb000gt.roles.grid', ncb000gt.roles.Grid);