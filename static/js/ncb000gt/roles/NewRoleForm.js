Ext.namespace("ncb000gt.roles");

ncb000gt.roles.NewRoleForm = function(config) {
    config['id'] = 'add_role';
    Ext.apply(this, config);

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