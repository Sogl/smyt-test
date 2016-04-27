App.view.sendPanel = Ext.extend(Ext.form.FormPanel, {
    region: 'center',
    autoHeight : true,
    bodyStyle:'padding: 10px',
    defaultType: 'textfield',
    defaults: {
        allowBlank:false,
        blankText: 'Необходимо заполнить поле',
    },
    /**
    * initComponent
    * @protected
    */
    initComponent : function() {
        // build the form-fields.  Always a good idea to defer form-building to a method so that this class can
        // be overridden to provide different form-fields
        this.items = this.buildForm();

        //build form-buttons
        this.buttons = this.buildUI();

        //super
        App.view.sendPanel.superclass.initComponent.call(this);
    },
   /**
    * buildform
    * @private
    */
   buildForm : function() {
       return [
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
           }
       ];
   },
   /**
   * buildUI
   * @private
   */
    buildUI: function(){
        return [{
            text: 'Сохранить',
            handler: this.onSave,
            scope: this
        },{
            text: 'Отменить'
            // handler: function() {
            //     this.hide();
            // },
            // scope: this
        }];
    },

    /**
    * onSave
    */
    onSave: function() {
        if (!this.getForm().isValid()) {
            Ext.Msg.alert('Сохранение', 'Невозможно сохранить. Пожалуйста, заполните все поля формы.');
            return;
        }
        //get form values
        var params = this.getForm().getValues();
        console.log(params);

        //send POST Ajax request
        Ext.Ajax.request({
            params: params,
            timeout: 30000,
            url: './server/foo.php',
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


});

// register xtype
Ext.reg('sendPanel', App.view.sendPanel);