//custom loan grid
App.view.loan.loanGrid = Ext.extend(Ext.grid.GridPanel, {
    stripeRows: true,
    cls: 'my-panel',
    columnLines: true,
    enableColumnHide: false,
    enableHdMenu: false,
    id: 'loan-grid',
    viewConfig: {
        forceFit: true
    },
    initComponent : function() {

        //build toolbars/buttons and selection model
        this.tbar = this.buildTopToolbar();
        this.sm = this.buildSelectionModel();

        //super
        App.view.loan.loanGrid.superclass.initComponent.call(this);
    },

    /**
     * buildTopToolbar
     */
    buildTopToolbar: function() {
        var ttb = new Ext.Toolbar({
            height: 50,
            layout: 'hbox',
            cls: 'my-tbar',
            layoutConfig: {
                align: 'middle'
            },
            defaults: {
                //flex : 1
                cls: 'x-toolbar-standardbutton'
            },
            items: [
                {xtype: 'tbspacer', width: 10}, // add a 10px space
                {
                    text: 'Выдать займ',
                    icon: './img/icons/money.png',
                    height: 30,
                    style: { 'padding-left': '5px' }
                },
                {xtype: 'tbspacer', width: 10}, // add a 10px space
                {
                    text: 'Просмотр займа',
                    icon: './img/icons/eye.png',
                    height: 30
                },
                {xtype: 'tbspacer', width: 10}, // add a 10px space
                {
                    text: 'Информация',
                    icon: './img/icons/info.png',
                    height: 30
                }
            ]
        });

        return ttb;
    },

    /**
     * buildSelectionModel
     */
    buildSelectionModel: function() {
        var sm = new Ext.grid.RowSelectionModel({
            singleSelect: true,
            listeners: {
                scope: this,
                rowselect: function(grid, rowIndex, record) {
                    this.toggleFirstButtonShowState(grid.grid, rowIndex);
                },
                rowdeselect: function(grid, rowIndex, record) {
                    this.toggleFirstButtonShowState(grid.grid, rowIndex);
                }
            }
        });
        return sm;
    },

    /**
     * toggleFirstButtonShowState
     */
    toggleFirstButtonShowState: function(grid, rowIndex) {

        //'action' is data index of
        var colIndex = this.getColumnIndexByDataIndex(grid, 'action');
        console.log(colIndex);

        // 7 is the last cell index
        var cell = grid.getView().getCell( rowIndex, colIndex);
        //select icons in cell
        var icons = Ext.DomQuery.select('.x-action-col-icon', cell);

        //for each DOM element
        Ext.each(icons, function(icon, index) {
            currentIcon = Ext.get(icon);

            //if not 1st button
            if (index !== 0) {
                //Show/delete class that hides. Class 'x-hidden' also works
                currentIcon.toggleClass('x-hide-display'); //show/hide icon
            }

        });
    },

    getColumnIndexByDataIndex: function(grid, dataIndex) {
        //columns
        gridColumns = grid.getColumnModel().columns;

        for (var i = 0; i < gridColumns.length; i++) {
           if (gridColumns[i].dataIndex == dataIndex) {
                return i;
           }
        }

    }

});

// register xtype
Ext.reg('loanGrid', App.view.loan.loanGrid);