//custom loan model
App.model.loanModel = Ext.extend(Ext.grid.ColumnModel, {

    constructor: function() {
        config = {
            columns: [
                {
                    header   : 'Дата',
                    width    : 85,
                    renderer : Ext.util.Format.dateRenderer('d.m.Y'),
                    dataIndex: 'startDate'
                },
                {
                    header   : 'Срок',
                    width    : 80,
                    renderer: {
                        fn: this.daysChange,
                        scope: this
                    },
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
                    renderer: {
                        fn: this.thoursandSeparator,
                        scope: this
                    },
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
                    renderer: {
                        fn: this.thoursandSeparator,
                        scope: this
                    },
                    dataIndex: 'totalPctSum'
                },
                {
                    header   : 'Статус',
                    width    : 75,
                    dataIndex: 'status'
                },
                {
                    xtype: 'actioncolumn',
                    width: 80,
                    items: [
                        {
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
                            // handler : function() {
                            //     win2.show();
                            // }
                        },
                        {
                            icon   : './img/icons/close.png',
                            tooltip: 'Удалить',
                            iconCls: 'my-icon x-hide-display',
                            handler : function(grid, rowIndex, colIndex) {
                                Ext.MessageBox.confirm('Удаление', 'Вы действительно хотите удалить эту запись?', function(btn) {
                                    if (btn === 'yes') {
                                        var rec = grid.store.getAt(rowIndex);
                                        grid.store.remove(rec);
                                    }
                                });
                            }
                        }
                    ]
                },
            ]
        };

        //super
        App.model.loanModel.superclass.constructor.call(this, config);
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
    daysChange: function(val) {
        if (val > 0) {
            return val + ' ' + this.declOfNum(val, ['день', 'дня', 'дней']);
        }
        return val;
    },

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    thoursandSeparator: function(val) {
        //check if contains decimal
        if (val > Math.floor(val)) {
            return this.numberWithSpaces(val);
        }

        return this.numberWithSpaces(val) + '.00';
    },

    numberWithSpaces: function(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }


});