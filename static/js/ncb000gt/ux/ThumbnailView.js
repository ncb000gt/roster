/*Based on the ExtJS Samples page.*/

Ext.namespace("ncb000gt.ux");

ncb000gt.ux.ThumbnailView = function(config) {
    Ext.apply(this, config);

    ncb000gt.ux.ThumbnailView.superclass.constructor.call(
	this,
	{
	    id: 'thumbnail-view',
	    frame: true,
	    collapsible: true,
	    itemSelector: 'dd',
	    overClass: 'over',
	    tpl: new Ext.XTemplate(
		'<div id="items">',
		'<tpl for=".">',
		'<div><a name="{id}"></a><h2><div>{title}</div></h2>',
		'<dl>',
		'<tpl for="items">',
		'<dd id="{id}"><img src="{icon}"/>',
		'<div><h4>{title}</h4><p>{desc}</p></div>',
		'</dd>',
		'</tpl>',
		'<div style="clear:left"></div></dl></div>',
		'</tpl>',
		'</div>'
	    ),
	    onClick : function(e) {
		var group = e.getTarget('h2', 3, true);
		if(group){
		    group.up('div').toggleClass('collapsed');
		} else {
		    var t = e.getTarget('dd', 5, true);
		    if(t){
			events.publish('add-tab.'+t.getAttribute('id'), {});
		    }
		}
		return ncb000gt.ux.ThumbnailView.superclass.onClick.apply(this, arguments);
	    }
	}
    );

    this.store.load();
};

Ext.extend(
    ncb000gt.ux.ThumbnailView,
    Ext.DataView,
    {
	/*addSection: function(section, group) {
	    group = group || 'default';

	}*/
    }
);

Ext.reg('ncb000gt.ux.thumbnailview', ncb000gt.ux.ThumbnailView);