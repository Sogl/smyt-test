//create custom store
var rt = Ext.data.Record.create([
    {name: 'date'},
    {name: 'number'},
    {name: 'percent'}
]);

Ext.define('TestStore', {
    extend: 'Ext.data.Store',
    reader: new Ext.data.ArrayReader(
        {
            idIndex: 0  // id for each record will be the first element
        },
        rt // recordType
    ),
    storeId: 'TestStore',
    generateData: function(count) {
        var me = this,
            data = [];
        // generate records
        for( var i=0;i<count;i++) {
            data.push([
                me.randomDate(new Date(2016, 0, 1), new Date()),
                'Документ ' + Math.floor( Math.random() * 100 ),
                ( ( Math.random() * 1000 ) / 3.2 ).toFixed( 1 )
            ]);
        }
        //console.log(data);
        return data;
    },
    randomDate: function(start, end) {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    },
    constructor: function(count) {
        //console.log('constructor!');
        var me = this;
        TestStore.superclass.constructor.apply(me, arguments);
        me.loadData(me.generateData(count), true);
        //me.add(me.generateData());
    }
});

//create store with 7 random
var store2 = new TestStore(7);
console.log(store2);

var gridNew = new Ext.grid.GridPanel({
    store: store2,
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