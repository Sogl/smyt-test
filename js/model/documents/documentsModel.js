//custom documents model
App.model.documents.documentsModel = Ext.extend(Ext.grid.ColumnModel, {

    constructor: function() {
        config = {
            columns: [
                {
                    header: 'Дата',
                    dataIndex: 'date',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
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
        };

        //super
        App.model.documents.documentsModel.superclass.constructor.call(this, config);
    }
});