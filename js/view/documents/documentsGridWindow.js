App.view.documents.documentsGridWindow = Ext.extend( App.interface.modalWindow, {
    title: 'Список документов',
    initComponent: function() {
        var config = {
            items: [{
                xtype: 'documentsGrid',
                store: new App.store.documents.documentsRandomStore(7),
                colModel: new App.model.documents.documentsModel({}),
                height: 200,
                width: 300
            }]
        };

        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

        //super
        App.view.documents.documentsGridWindow.superclass.initComponent.apply(this, arguments);
    }

});

// register xtype
Ext.reg('documentsGridWindow', App.view.documents.documentsGridWindow);