//component communication
App.view.send.sendPanelWindow = Ext.extend(App.interface.modalWindow, {
    title: 'Окно отправки запросов',
    initComponent: function() {
        var config = {
            items: [{
                xtype: 'sendPanel',
                width: 300
            }]
        };

        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

        //super
        App.view.send.sendPanelWindow.superclass.initComponent.apply(this, arguments);

        //select first panel
        this.sendPanel = this.items.itemAt(0);

        //add render event on panel
        this.sendPanel.on({
            scope: this,
            render: function() {
                //add click event on second (cancel) button
                this.sendPanel.buttons[1].on({
                    click: this.onCancel,
                    scope: this
                });
            }
        });

    },

    onCancel: function() {
        this.hide();
    }
});

// register xtype
Ext.reg('sendPanelWindow', App.view.send.sendPanelWindow);