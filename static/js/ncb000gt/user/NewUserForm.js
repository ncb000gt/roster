var NewUserForm = function(config) {
    Ext.apply(this, config);

    NewUserForm.superclass.constructor.call(
	this,
	{
            title: 'User Details',
            defaults: {width: 230},
            defaultType: 'textfield',
            items: [{
			fieldLabel: 'First Name',
			name: 'first',
			allowBlank:false
                    },{
			fieldLabel: 'Last Name',
			name: 'last',
			allowBlank:false
                    },{
			fieldLabel: 'Password',
			name: 'password',
			allowBlank:false,
			vtype:'password'
                    }, {
			fieldLabel: 'Email',
			name: 'email',
			allowBlank:false,
			vtype:'email'
                    }]
        }
    );
};

Ext.extend(
    NewUserForm,
    Ext.form.BasicForm,
    {
    }
);

Ext.reg('ncb000gt.user.newuserform', NewUserForm);