App.view.indexViewport = Ext.extend(Ext.Viewport, {

    initComponent: function() {
        var config = {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
               {
                    //create view.sendPanelWindow instance (@see sendPanelWindow.js)
                    xtype: 'loanGrid',
                    store: new App.store.loan.loanStore({}),
                    colModel: new App.model.loan.loanModel({}),
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
                    //create view.sendPanelWindow instance (@see sendPanelWindow.js)
                    xtype: 'sendPanelWindow',
                },
                {
                    //create view.documentsGridWindow instance (@see documentsGridWindow.js)
                    xtype: 'documentsGridWindow',
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

        //add events
        this.loanGrid.on ({
            scope: this,
            afterrender: function() {

                //get tbar items
                var items = this.loanGrid.getTopToolbar().items;

                //foreach
                items.each(function(item) {
                    //only buttons
                    if (item.getXType() == 'button') {

                        item.on({
                            scope: this,
                            click: function() {
                                this.sendPanelWindow.show();
                            }
                        });
                    }

                }, this);

                //get selection model
                selModel = this.loanGrid.getSelectionModel();

                selModel.on({
                    scope: this,
                    rowselect: function (grid, rowIndex, keepExisting, record) {

                        //get second icon in actioncolumn
                        var icon = grid.grid.getColumnModel().getColumnById('action').items[1];

                        //save context
                        var self = this;

                        //add handler by direct set
                        icon.handler = function(grid, rowIndex, colIndex) {
                            //open documents window
                            self.documentsGridWindow.show();
                        };
                    }
                });

            }
        });
    }

});

// register xtype
Ext.reg('indexViewport', App.view.indexViewport);