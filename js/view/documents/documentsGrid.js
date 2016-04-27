//custom documents grid
App.view.documentsGrid = Ext.extend(Ext.grid.GridPanel, {
    enableHdMenu: false,
    stripeRows: true,
    viewConfig: {
        forceFit: true
    },

    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        //super
        App.view.documentsGrid.superclass.initComponent.call(this);
    }
});

// register xtype
Ext.reg('documentsGrid', App.view.documentsGrid);