//loan store
App.store.loanStore = new Ext.data.ArrayStore({
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
