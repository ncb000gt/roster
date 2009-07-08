Ext.namespace("ncb000gt.users");

ncb000gt.users.NewUserForm = function(config) {
    config['id'] = 'add_user';
    Ext.apply(this, config);

    var add_user_button = new Ext.Button(
	{
	    text: "Add User"
	}
    );

    add_user_button.on(
	'click',
	function(evt) {
	    var params = {};

	    this.items.each(function(item) {params[item.name] = item.getValue();});

	    Ext.Ajax.request(
		{
		    url: '/roster/add_user',
		    params: params,
		    method: 'post',
		    disableCaching: true,
		    success: function(response, options) {
			var data = Ext.decode(response.responseText);
			var toast = new Ext.ux.ToastWindow({
			    title: 'Add User',
			    html: data.message,
			    iconCls: 'x-icon-'+((data.status == 1)?'info':'error')
			}).show(document);
			toast = null;
			if (data.status === 1)
			    events.publish('update-user-grid');
		    }
		}
	    );
	},
	this
    );

    var combo_store = new Ext.data.JsonStore(
	{
	    url: '/roster/roles_json',
	    fields: ['role'],
	    root: 'items'
	}
    );

    ncb000gt.users.NewUserForm.superclass.constructor.call(
	this,
	{
	    url: '/roster/add_user',
	    method: 'post',
            defaults: {width: 150},
            defaultType: 'textfield',
            items: [
		{
		    fieldLabel: 'Username',
		    name: 'username',
		    allowBlank: false
		},
		{
		    fieldLabel: 'First Name',
		    name: 'first_name',
		    allowBlank: false
		},
		{
		    fieldLabel: 'Last Name',
		    name: 'last_name',
		    allowBlank: false
		},
		new Ext.ux.PasswordMeter(
		    {
			fieldLabel: 'Password',
			name: 'password',
			allowBlank: false,
			inputType: 'password'
		    }
		),
		{
		    fieldLabel: 'Email',
		    name: 'email',
		    allowBlank: false,
		    vtype: 'email'
		},
		new Ext.form.ComboBox(
		    {
			name:'role',
			fieldLabel: 'Role',
			allowBlank: true,
			store: combo_store,
			displayField:'role',
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Select a role...',
			selectOnFocus:true
		    }
		)
	    ],
	    buttons: [
		add_user_button
	    ]
        }
    );

    combo_store.load();
};

Ext.extend(
    ncb000gt.users.NewUserForm,
    Ext.form.FormPanel,
    {
    }
);

Ext.reg('ncb000gt.users.newuserform', ncb000gt.users.NewUserForm);