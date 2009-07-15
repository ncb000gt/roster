Ext.namespace('ncb000gt.users');

ncb000gt.users.Grid = function(config) {
    Ext.apply(this, config);

    var pagination = new Ext.PagingToolbar(
	{
	    pageSize: 20,
	    store: this.store,
	    displayInfo: true,
	    displayMsg: 'Displaying users {0} - {1} of {2}',
	    emptyMsg: "No users available"
	}
    );

    this.bbar = pagination;

    events.subscribe('update-user-grid', function() { this.store.reload(); }, this);

    var delete_action = new Ext.ux.grid.RowActions(
	{
	    actions: [
		{
		    iconCls: 'x-icon-delete',
		    tooltip:'Remove Entry'
		}
	    ],
	    callbacks: {
		'x-icon-delete': function(grid, record, action, row, col) {
		    Ext.MessageBox.buttonText.yes = 'Delete';
		    Ext.MessageBox.buttonText.no = 'Disable';
		    Ext.MessageBox.buttonText.cancel = 'Cancel';
		    Ext.MessageBox.show(
			{
			    title: 'Manage User Account',
			    msg: 'What would you like to do with this user account?',
			    width:300,
			    buttons: Ext.MessageBox.YESNOCANCEL,
			    fn: function(btn){
				console.log(String.format('You clicked the {0} button.', btn));
				var action = '';
				if (btn == 'yes')
				    action = 'delete';
				else if (btn == 'no')
				    action = 'disable';
				else
				    return;

				Ext.Ajax.request(
				    {
					url: '/roster/'+action+'_user',
					params: record.data,
					method: 'post',
					disableCaching: true,
					success: function(response, options) {
					    var data = Ext.decode(response.responseText);
					    var toast = new Ext.ux.ToastWindow({
							    title: 'Managed User Account',
							    html: data.message,
							    iconCls: 'x-icon-'+((data.status == 1)?'info':'error')
									       }).show(document);
					    toast = null;
					    if (data.status === 1)
						events.publish('update-user-grid');
					}
				    }
				);
			    }
			}
		    );
		}
	    }
        }
    );

    this.columns = [
	delete_action,
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
	},
	{
	    id: 'status',
	    header: 'Status',
	    dataIndex: 'status',
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
	    },
	    plugins: [delete_action]
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