//for all modal windows

App.interface.modalWindow = Ext.extend(Ext.Window, {
    modal: true,
    closable: true,
    closeAction: 'hide',
    bodyBorder: false,
    border: false,
    layout: 'fit',
    initComponent:function() {

        // apply config
        //Ext.apply(this, Ext.apply(this.initialConfig, config));

        // call parent
        App.interface.modalWindow.superclass.initComponent.apply(this, arguments);
    }

});

// register xtype
Ext.reg('modalwindow', App.interface.modalWindow);