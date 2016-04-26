// user
Ext.ns('App', 'App.user');

App.user.loanGrid = Ext.extend(Ext.grid.GridPanel, {
    store: App.store.loanStore,
    colModel: new App.model.loanModel({}),
    stripeRows: true,
    cls: 'my-panel',
    columnLines: true,
    enableColumnMove: false,
    enableColumnHide: false,
    enableHdMenu: false,
    viewConfig: {
        forceFit: true
    },
    initComponent : function() {

        // build toolbars and buttons.
        this.tbar = this.buildTopToolbar();
        this.sm = this.buildSelectionModel();

        // super
        App.user.loanGrid.superclass.initComponent.call(this);
    },

    /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        var ttb = new Ext.Toolbar({
            height       : 50,
            layout       : 'hbox',
            cls: 'my-tbar',
            layoutConfig : {
                align : 'middle'
            },
            defaults : {
                //flex : 1
                cls: 'x-toolbar-standardbutton'
            },
            items: [
                {xtype: 'tbspacer', width: 10}, // add a 10px space
                {
                    text: 'Выдать займ',
                    icon: './img/icons/money.png',
                    height: 30,
                    style: { 'padding-left': '5px' },
                    handler: function() {
                        win.show();
                        //App.user.Window.show();
                    }
                },
                {xtype: 'tbspacer', width: 10}, // add a 10px space
                {
                    text: 'Просмотр займа',
                    icon: './img/icons/eye.png',
                    height: 30,
                    handler: function() {
                        win.show();
                    }
                },
                {xtype: 'tbspacer', width: 10}, // add a 10px space
                {
                    text: 'Информация',
                    icon: './img/icons/info.png',
                    height: 30,
                    handler: function() {
                        win.show();
                    }
                }
            ]
        });

        return ttb;
    },

    /**
     * buildSelectionModel
     */
    buildSelectionModel : function() {
        var sm = new Ext.grid.RowSelectionModel({
            singleSelect: true,
            listeners: {
                rowselect: function(grid, rowIndex, record) {

                    // 7 is the last cell index
                    var cell = grid.grid.getView().getCell( rowIndex, 7 );
                    //select icons in cell
                    var icons = Ext.DomQuery.select('.x-action-col-icon', cell);

                    //for each DOM element
                    Ext.each(icons, function(icon, index) {
                        //if not 1st button
                        if (index !== 0) {
                            //Delete class that hides. Class 'x-hidden' also works
                            Ext.get(icon).removeClass('x-hide-display'); //show icon
                        }
                    });
                },
                rowdeselect: function(grid, rowIndex, record) {

                    // 7 is the last cell index
                    var cell = grid.grid.getView().getCell( rowIndex, 7 );
                    //select icons in cell
                    var icons = Ext.DomQuery.select('.x-action-col-icon', cell);

                    //for each DOM element
                    Ext.each(icons, function(icon, index) {
                        //if not 1st button
                        if (index !== 0) {
                            //Add class that hides. Class 'x-hidden' also works
                            Ext.get(icon).addClass('x-hide-display'); //hide icon
                        }
                    });
                }
            }
        });
        return sm;
    }
});

// register xtype
Ext.reg('loanGrid', App.user.loanGrid);