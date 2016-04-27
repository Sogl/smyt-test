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

        //add events
        this.loanGrid.on ({
            scope: this,
            afterrender: function() {
                //console.log(this);

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


                //console.log(this.loanGrid.getSelectionModel());

                selModel = this.loanGrid.getSelectionModel();
                //console.log(selModel);

                //console.log(this);

                selModel.on({
                    scope: this,
                    rowselect: function (grid, rowIndex, keepExisting, record) {
                        //console.log(rowIndex);

                        // var gridrecord = grid.grid.getSelectionModel().getSelected();
                        // console.log(gridrecord);

                        //console.log(this);
                        // console.log(grid.grid.getView());
                        // console.log(grid.grid.getView().getRow());
                        //
                        // var cell = grid.grid.getView().getCell( rowIndex, 7 );
                        // console.log(cell);

                        //console.log(record);
                        // console.log(grid.grid);
                        // console.log(grid.grid.down('x-grid3-row-selected'));

                        //var el = Ext.get('x-grid3-row-selected');
                        var el = grid.grid.find('x-grid3-row');
                        console.log(el);

                    }
                });

            }
        });
    },

    Click: function () {
        console.log(this);
    }

});

// register xtype
Ext.reg('indexViewport', App.view.indexViewport);