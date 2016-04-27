App.view.documentsGridWindow = Ext.extend( App.interface.modalWindow, {
    title: 'Список документов',
    initComponent:function() {
        var config = {
            items: [{
                xtype: 'documentsGrid',
                store: new App.store.documentsRandomStore(7),
                colModel: new App.model.documentsModel({}),
                height: 200,
                width: 300
            }]
        };

        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

        //super
        App.view.documentsGridWindow.superclass.initComponent.apply(this, arguments);
    }

});

// register xtype
Ext.reg('documentsGridWindow', App.view.documentsGridWindow);