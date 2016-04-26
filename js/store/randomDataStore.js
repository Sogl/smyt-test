App.store.randomDataStore = Ext.extend(Ext.data.Store, {
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