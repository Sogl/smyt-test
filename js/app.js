//1x1px transparent image
Ext.BLANK_IMAGE_URL = './extjs/resources/images/default/s.gif';


//*** Application namespaces
Ext.ns('App');
//interface modules namespace
Ext.ns('App', 'App.interface');
//models/columns namespaces
Ext.ns('App', 'App.model');
Ext.ns('App.model', 'App.model.documents');
Ext.ns('App.model', 'App.model.loan');
//view namespaces
Ext.ns('App', 'App.view');
Ext.ns('App.view', 'App.view.documents');
Ext.ns('App.view', 'App.view.loan');
Ext.ns('App.view', 'App.view.send');
//store/data namespaces
Ext.ns('App', 'App.store');
Ext.ns('App.store', 'App.store.documents');
Ext.ns('App.store', 'App.store.loan');

// sample loan data
var loanData = [
    ['14-01-2012', 61, '13-04-2012', 90000.00, 7,  108000.00, 'погашен'],
    ['13-02-2012', 10, '18-04-2012', 70000.00, 10,  84000.00, 'выдан'],
    ['14-02-2012', 20, '14-04-2012', 91000.01, 7.1,  109000.1, 'погашен'],
    ['15-02-2012', 30, '15-04-2012', 92000.02, 7.01,  109000.02, 'погашен'],
    ['16-02-2012', 40, '16-04-2012', 93000.03, 7.02,  109000.03, 'погашен']
];


//*** application main entry point
Ext.onReady(function(){
    //show tooltips
    Ext.QuickTips.init();

    //add RU messagebox tanslation
    Ext.MessageBox.buttonText.yes = 'Да';
    Ext.MessageBox.buttonText.no = 'Нет';

    //create Viewport... that's all! =)
    var Vprt = new App.view.indexViewport({});

    console.log(this);

}); //end onReady