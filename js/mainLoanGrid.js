// user
Ext.ns('App', 'App.user');

App.user.Grid = Ext.extend(Ext.grid.GridPanel, {
    //store: store,
    stripeRows: true,
    // autoExpandColumn: 'loanStatus',
    // height: 350,
    // width: 700,
    cls: 'my-panel',
    columnLines: true,
    enableColumnMove: false,
    enableColumnHide: false,
    enableHdMenu: false,
    title: 'История займов по заемщику',

    initComponent : function() {

        // build toolbars and buttons.
        this.tbar = this.buildTopToolbar();
        this.columns = this.buildColumns();
        this.sm = this.buildSelectionModel();
        //this.buttons = this.buildUI();

        // super
        App.user.Grid.superclass.initComponent.call(this);
    },

    /**
     * buildColumns
     */
    buildColumns : function() {
        var colMod = new Ext.grid.ColumnModel([
            {
                header   : 'Дата',
                width    : 85,
                renderer : Ext.util.Format.dateRenderer('d.m.Y'),
                dataIndex: 'startDate'
            },
            {
                header   : 'Срок',
                width    : 80,
                renderer : this.daysChange,
                dataIndex: 'loanTime'
            },
            {
                header   : 'Дата пог.',
                width    : 85,
                renderer : Ext.util.Format.dateRenderer('d.m.Y'),
                dataIndex: 'endDate'
            },
            {
                header   : 'Тело займа',
                width    : 85,
                renderer : this.thoursandSeparator,
                dataIndex: 'loanBody'
            },
            {
                header   : '%',
                width    : 40,
                dataIndex: 'pct'
            },
            {
                header   : 'Сумма + %',
                width    : 85,
                renderer : this.thoursandSeparator,
                dataIndex: 'totalPctSum'
            },
            {
                id       :'loanStatus',
                header   : 'Статус',
                width    : 75,
                dataIndex: 'status'
            },
            {
                xtype: 'actioncolumn',
                width: 80,
                items: [{
                    icon   : './img/icons/print.png',
                    tooltip: 'Печать',
                    iconCls: 'my-icon',
                    handler : function() {
                        window.open (
                          'about:blank',
                          '_blank'
                        );
                    }
                },
                {
                    icon   : './img/icons/docs.png',
                    tooltip: 'Список документов',
                    iconCls: 'my-icon x-hide-display',
                    handler : function() {
                        win2.show();
                    }
                },
                {
                    icon   : './img/icons/close.png',
                    tooltip: 'Удалить',
                    iconCls: 'my-icon x-hide-display',
                    handler : function(grid, rowIndex, colIndex) {
                        Ext.MessageBox.confirm('Удаление', 'Вы действительно хотите удалить эту запись?', function(btn) {
                            if (btn === 'yes') {
                                var rec = store.getAt(rowIndex);
                                store.remove(rec);
                            }
                        });
                    }
                }]
            },
        ]);

        return colMod;
    },

    /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        var tb = new Ext.Toolbar({
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

        return tb;
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

    },

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    daysChange: function(val) {
        if (val > 0) {
            return val + ' ' + declOfNum(val, ['день', 'дня', 'дней']);
        }
        return val;
    },

    declOfNum: function(number, titles)
    {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    thoursandSeparator: function(val) {
        //check if contains decimal
        if (val > Math.floor(val)) {
            return numberWithSpaces(val);
        }

        return numberWithSpaces(val) + '.00';
    },

    numberWithSpaces: function(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

});