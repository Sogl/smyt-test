//custom loan store
App.store.loanStore = Ext.extend(Ext.data.ArrayStore, {
    constructor: function() {
        config = {
            fields: [
                {name: 'startDate', type: 'date', dateFormat: 'd-m-Y'},
                {name: 'loanTime', type: 'int'},
                {name: 'endDate', type: 'date', dateFormat: 'd-m-Y'},
                {name: 'loanBody',      type: 'number'},
                {name: 'pct',     type: 'float'},
                {name: 'totalPctSum',  type: 'number'},
                {name: 'status'}
            ]
        };

        //super
        App.store.loanStore.superclass.constructor.call(this, config);
    }
});
