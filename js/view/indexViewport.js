App.view.indexViewport = Ext.extend(Ext.Viewport, {

    initComponent:function() {
        var config = {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
               {
                   xtype: 'loanGrid',
                   store: new App.store.loanStore({}),
                   colModel: new App.model.loanModel({}),
                   height: 350,
                   width: 700,
                   title: 'История займов по заемщику',
                   listeners: {
                       render: function() {
                           //load data to store
                           this.getStore().loadData(loanData);
                       }
                   }
               },
               {
                   xtype: 'sendPanelWindow',
                   // listeners: {
                   //     afterrender: function() {
                   //         this.show();
                   //     }
                   // }
               },
               {
                   // create view.documentsGrid instance (@see documentsGrid.js)
                   xtype: 'documentsGridWindow',
                   // listeners: {
                   //     afterrender: function() {
                   //         this.show();
                   //     }
                   // }
               }

            ]
        };


        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        //super
        App.view.indexViewport.superclass.initComponent.call(this);

        //get items
        this.loanGrid = this.items.itemAt(0);
        this.sendPanelWindow = this.items.itemAt(1);
        this.documentsGridWindow = this.items.itemAt(2);

        this.loanGrid.on ({
            scope: this,
            afterrender: function() {
                var items = this.loanGrid.getTopToolbar().items;

                items.each(function(item) {
                    if (item.getXType() == 'button') {

                        item.on({
                            scope: this,
                            click: function() {
                                console.log(this);

                                console.log('yep!');
                                this.sendPanelWindow.show();
                            }
                        });
                    }

                });


            }
        });
    }

});

// register xtype
Ext.reg('indexViewport', App.view.indexViewport);