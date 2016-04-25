//1x1px transparent image
Ext.BLANK_IMAGE_URL = './extjs/resources/images/default/s.gif';


// Application namespace
Ext.ns('App');

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

// application main entry point
Ext.onReady(function(){
    //show tooltips
    Ext.QuickTips.init();
    //add RU messagebox tanslation
    Ext.MessageBox.buttonText.yes = 'Да';
    Ext.MessageBox.buttonText.no = 'Нет';


    // create user.Grid instance (@see UserGrid.js)
    var mainLoanGrid = new App.user.Grid({
        store: store,
        //renderTo: 'user-grid',
        //autoExpandColumn: 'loanStatus',
        height: 350,
        width: 700

    });


    //do a Viewport
    new Ext.Viewport({
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items:[mainLoanGrid]
        //items:[gridNew, win]
    });

}); //end onReady