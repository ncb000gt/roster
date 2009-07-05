Ext.namespace("ncb000gt.roles");

ncb000gt.roles.NewRoleForm = function(config) {
    config['id'] = 'add_role';
    Ext.apply(this, config);
/*
    var add_role_button = new Ext.Button(
	{
	    text: "Add Role"
	}
    );

    add_role_button.on(
	'click',
	function(evt) {
	    var params = {};

	    this.items.each(function(item) {params[item.name] = item.getValue();});

	    Ext.Ajax.request(
		{
		    url: '/add_role',
		    params: params,
		    method: 'post',
		    disableCaching: true,
		    success: function(response, options) {
			var data = Ext.decode(response.responseText);
			var toast = new Ext.ux.ToastWindow({
			    title: 'Add Role',
			    html: data.message,
			    iconCls: 'info'
			}).show(document);
			toast = null;
			if (data.status === 1)
			    events.publish('update-role-grid');
		    }
		}
	    );
	},
	this
    );
*/
    ncb000gt.roles.NewRoleForm.superclass.constructor.call(
	this,
	{
	    url: '/add_role',
	    method: 'post',
            defaults: {width: 150},
            defaultType: 'textfield',
            items: [
		{
		    fieldLabel: 'Role',
		    name: 'role',
		    allowBlank: false
		}
	    ]
        }
    );
};

Ext.extend(
    ncb000gt.roles.NewRoleForm,
    Ext.form.FormPanel,
    {
    }
);

Ext.reg('ncb000gt.roles.newroleform', ncb000gt.roles.NewRoleForm);