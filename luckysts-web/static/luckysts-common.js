/*
 * LuckySTS: Common objects
 * @author Sergey Sobko
 * @email: S.Sobko@profitware.ru
 */

Ext.onReady(function () {

    // Term model
    Ext.define('termModel', {
        extend: 'Ext.data.Model',
        fields: [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'last_update',
                type: 'string'
            }
        ]
    });

    // For Term model using data from /v1/terms/
    var termStore = Ext.create('Ext.data.Store', {
        model: 'termModel',
        proxy: {
            type: 'ajax',
            url: '/v1/terms/',
            reader: {
                type: 'json',
                root: 'terms'
            }
        },
        autoLoad: true,
        storeId: 'termStore'
    });

    // Main common toolbar menu
    Ext.create('Ext.toolbar.Toolbar', {
        items: [
            {
                text: 'Словарь',
                handler: function () {
                    window.location.href = 'dictionary';
                }
            }
        ],
        margin: '0 0 5 0',
        id: 'mainToolbar'
    });

});