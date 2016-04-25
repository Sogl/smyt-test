//1x1px transparent image
Ext.BLANK_IMAGE_URL = './extjs/resources/images/default/s.gif';


// Application namespace
Ext.ns('App');

//console.log(App);

// application main entry point
Ext.onReady(function(){
    //show tooltips
    Ext.QuickTips.init();
    //add RU messagebox tanslation
    Ext.MessageBox.buttonText.yes = 'Да';
    Ext.MessageBox.buttonText.no = 'Нет';

    /*!!! MAIN GRID */

    Ext.ns('App', 'App.user');
    /**
     * App.user.Grid
     * A typical GridPanel extension.
     */
    // console.log(App);


    // sample static data for the store
    var myData = [
        ['14-01-2012', 61, '13-04-2012', 90000.00, 7,  108000.00, 'погашен'],
        ['13-02-2012', 10, '18-04-2012', 70000.00, 10,  84000.00, 'выдан'],
        ['14-02-2012', 20, '14-04-2012', 91000.01, 7.1,  109000.1, 'погашен'],
        ['15-02-2012', 30, '15-04-2012', 92000.02, 7.01,  109000.02, 'погашен'],
        ['16-02-2012', 40, '16-04-2012', 93000.03, 7.02,  109000.03, 'погашен']
    ];


    // create the data store
    var store = new Ext.data.ArrayStore({
       fields: [
            {name: 'startDate', type: 'date', dateFormat: 'd-m-Y'},
            {name: 'loanTime', type: 'int'},
            {name: 'endDate', type: 'date', dateFormat: 'd-m-Y'},
            {name: 'loanBody',      type: 'number'},
            {name: 'pct',     type: 'float'},
            {name: 'totalPctSum',  type: 'number'},
            {name: 'status'},

       ]
    });
    //console.log(store);

    // manually load local data
    store.loadData(myData);


    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function daysChange(val) {
        if (val > 0) {
            return val + ' ' + declOfNum(val, ['день', 'дня', 'дней']);
        }
        return val;
    }

    function declOfNum(number, titles)
    {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function thoursandSeparator(val) {
        //check if contains decimal
        if (val > Math.floor(val)) {
            return numberWithSpaces(val);
        }

        return numberWithSpaces(val) + '.00';
    }

    function numberWithSpaces(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }


    // create the Grid
    var mainLoanGrid = new Ext.grid.GridPanel({
        store: store,
        stripeRows: true,
        autoExpandColumn: 'loanStatus',
        height: 350,
        width: 700,
        cls: 'my-panel',
        columnLines: true,
        enableColumnMove: false,
        enableColumnHide: false,
        enableHdMenu: false,
        title: 'История займов по заемщику',
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
                renderer : daysChange,
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
                renderer : thoursandSeparator,
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
                renderer : thoursandSeparator,
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
        ],
        tbar: {
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
        },
        //selection model
        sm: new Ext.grid.RowSelectionModel({
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
        })
        //renderTo: Ext.getBody()
    });


    /* !!!ADDITIONAL PANEL */


    var panel = new Ext.form.FormPanel({
        region: 'center',
        width: 300,
        // height: 200,
        autoHeight : true,
        bodyStyle:'padding:5px 5px 0',
        defaultType: 'textfield',
        defaults: {
            allowBlank:false,
            blankText: 'Необходимо заполнить поле',
        },
        items: [
            {
                name: 'lastname',
                fieldLabel : 'Фамилия'
		    },
            {
                name: 'firstname',
                fieldLabel : 'Имя'
		    },
            {
                name: 'patronymic',
                fieldLabel : 'Отчество'
		    },
        ],
        buttons: [{
            text: 'Сохранить',
            handler: function() {
                if (!panel.getForm().isValid()) {
                    Ext.Msg.alert('Сохранение', 'Невозможно сохранить. Пожалуйста, заполните все поля формы.');
                    return;
                }

                //get form values
                var params = panel.getForm().getValues();
                console.log(params);

                //send POST Ajax request
                Ext.Ajax.request({
                    params: params,
                    timeout: 30000,
                    url: './foo.php',
                    success: function(response, request) {
                        console.log(response);
                        console.log(request);

                        Ext.Msg.alert('Успех', 'Успешная отправка формы =)');
                    },
                    failure: function(response, request) {
                        Ext.Msg.alert('Неудача', 'Неудачная отправка формы =(. <br />' + response.responseText);
                    }
                });

            }
        },{
            text: 'Отменить',
            handler: function() {
                win.hide();
            }
        }]
    });

    //console.log(panel);

    var win = new Ext.Window({
        title: 'Окно отправки запроса',
        modal: true,
        closable: true,
        closeAction: 'hide',
        bodyBorder: false,
        border: false,
        layout: 'fit',
        items: [panel]
    });


    /* LAST PANEL */


    // Ext.define('TestStore', {
    //     extend: 'Ext.data.ArrayStore',
    //     storeId: 'TestStore',
    //     autoLoad: false,
    //     // reader: new Ext.data.ArrayReader(
    //     //     {
    //     //        idIndex: 0  // id for each record will be the first element
    //     //     },
    //     //     rt // recordType
    //     // ),
    //     constructor: function(){
    //         //this.callParent(arguments);
    //         this.superclass.constructor.apply(this, arguments);
    //         //this.model.prototype.idProperty = 'id';
    //         //
    //         this.loadData(new Date(), 111, 32.3);
    //     },
    //     fields: [
    //         { name: 'date', type: 'date' },
    //         { name: 'number', type: 'number' },
    //         { name: 'percent', type: 'float' }
    //     ]
    // });


    var My = Ext.extend('Ext.data.ArrayStore', {
        constructor: function() {
            this.superclass.constructor.apply(this, arguments);
            console.log('test');
        }
    });

    console.log(My);

    // Ext.define('TestStore', {
    //     extend: 'Ext.data.Store',
    //     //model: 'TestModel',
    //     fields: [
    //         {name: 'date'},
    //         {name: 'number'},
    //         {name: 'percent'}
    //     ],
    //     storeId: 'TestStore',
    //     generateData: function() {
    //         var me = this,
    //             data = [];
    //         // generate 10 records
    //         for( var i=0;i<10;i++) {
    //             data.push([
    //                 me.randomDate(new Date(2012, 0, 1), new Date()),
    //                 Math.floor( Math.random() * 1000 ),
    //                 ( ( Math.random() * 1000 ) / 3.2 ).toFixed( 1 )
    //             ]);
    //         }
    //         console.log(data);
    //         return data;
    //     },
    //     randomDate: function(start, end) {
    //         return new Date(
    //             start.getTime() + Math.random() * (end.getTime() - start.getTime())
    //         );
    //     },
    //     constructor: function() {
    //         console.log('constructor!');
    //         var me = this;
    //         //me.callParent(arguments);
    //         //me.add(me.generateData())
    //         me.superclass.constructor.apply(me, arguments);
    //         me.loadData(me.generateData(), true);
    //         //me.add(me.generateData());
    //     }
    // });



    // var myData2 = [
    //     ['14-01-2012', 61, 7.01],
    //     ['14-01-2013', 62, 7.02],
    //     ['14-01-2014', 63, 7.03],
    //     ['14-01-2015', 64, 7.04],
    // ];
    // // create the data store
    // var store2 = new Ext.data.ArrayStore({
    //     //autoLoad: true,
    //     fields: [
    //         {name: 'date',type: 'date', dateFormat: 'd-m-Y'},
    //         {name: 'number'},
    //         {name: 'percent'},
    //     ]
    // });
    // // manually load local data
    // store2.loadData(myData2);



    //var store2 = new TestStore();
    //console.log(store2);

    var gridNew = new Ext.grid.GridPanel({
        //store: store2,
        enableHdMenu: false,
        height: 200,
        width: 300,
        columns: [
        {
            header: 'Дата',
            dataIndex: 'date',
            renderer : Ext.util.Format.dateRenderer('d.m.Y'),
            //dateFormat: 'd.m.Y'
        },
        {
            header: 'Номер',
            dataIndex: 'number'
        },
        {
            header: 'Процент',
            dataIndex: 'percent'
        }
    ]
    });


    var win2 = new Ext.Window({
        title: 'Список документов',
        modal: true,
        closable: true,
        closeAction: 'hide',
        bodyBorder: false,
        border: false,
        layout: 'fit',
        //items: [gridNew]
    });


    //do a Viewport
    new Ext.Viewport({
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items:[mainLoanGrid, win, win2]
        //items:[gridNew, win]
    });

}); //end onReady