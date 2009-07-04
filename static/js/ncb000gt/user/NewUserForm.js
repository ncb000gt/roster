var NewUserForm = function(config) {
    Ext.apply(this, config);

    var add_user_button = new Ext.Button(
	{
	    text: "Add User"
	}
    );

    add_user_button.on(
	'click',
	function() {
	    console.log('test');
	},
	this
    );

    NewUserForm.superclass.constructor.call(
	this,
	{
            title: 'User Details',
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
		}
	    ],
	    buttons: [
		add_user_button
	    ]
        }
    );
};

Ext.extend(
    NewUserForm,
    Ext.form.FormPanel,
    {
    }
);

Ext.reg('ncb000gt.user.newuserform', NewUserForm);