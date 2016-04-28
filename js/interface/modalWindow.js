//for all modal windows
App.interface.modalWindow = Ext.extend(Ext.Window, {
    modal: true,
    closable: true,
    closeAction: 'hide',
    bodyBorder: false,
    border: false,
    layout: 'fit',
    initComponent: function() {
        // call parent
        App.interface.modalWindow.superclass.initComponent.apply(this, arguments);
    }

});

// register xtype
Ext.reg('modalWindow', App.interface.modalWindow);