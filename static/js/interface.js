dojo.require("dojox.data.QueryReadStore");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dojox.grid.DataGrid");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.TextBox");
dojo.require("dojox.form.PasswordValidator");
dojo.require("dojo.parser");
var start = 0;
var count = 15;

dojo.addOnLoad(
    function()
    {
	var subrow = [
	    {field: 'username', width: '200px', name: 'Username', noscroll: true},
	    {field: 'first_name', width: '100px', name: 'First Name'},
	    {field: 'last_name', width: '150px', name: 'Last Name'},
	    {field: 'email', width: 'auto', name: 'Email Address'}
	];

	var view = {rows:[subrow]};

	var structure = [view];

	var store = new dojox.data.QueryReadStore(
	    {
		url: "users_json",
		id: 'username'
	    }
	);

	var grid_setup = {
	    query: {
		username: '*'
	    },
	    autoHeight: true,
	    store: store,
	    structure: structure,
	    noDataMessage: 'No data?',
	    region: 'center',
	    rowsPerPage: 15,
	    rowCount: 15,
	    clientSort: false
	};

	var new_grid = new dojox.grid.DataGrid(grid_setup, "grid");
	dijit.byId("grid_pane").attr(
	    {
		content: new_grid
	    }
	);
	new_grid.startup();

	dojo.connect(
	    dojo.byId("submit_add_user"),
	    'onclick',
	    this,
	    function(evt) {
		var form = dojo.byId("add_user");
		dojo.xhrPost(
		    {
			url: "/add_user",
			form: form,
			handleAd: 'json',
			load: function(data) {
			    if (data.status === -1) {
				console.log('failure');
			    } else {
				console.log('success');
			    }
			},
			error: function(data) {
			    console.log('error');
			}
		    }
		);
	    }
	);
    }
);