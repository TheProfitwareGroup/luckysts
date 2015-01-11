/*
 * LuckySTS: Dictionary page
 * @author Sergey Sobko
 * @email: S.Sobko@profitware.ru
 */

Ext.onReady(function () {

    // Create panel flexible columns using term model
    var termPanel = Ext.create('Ext.grid.Panel', {
        store: Ext.getStore('termStore'),
        columns: [
            {
                text: 'Идентификатор',
                dataIndex: 'name',
                flex: 1
            },
            {
                text: 'Обновлено',
                dataIndex: 'last_update',
                flex: 3
            }
        ],
        flex: 1,
        title: 'Словарь'
    });

    // Main viewport
    Ext.create('Ext.container.Viewport', {
        items: [
            Ext.getCmp('mainToolbar'),
            termPanel
        ],
        renderTo: Ext.getBody(),
        layout: {
            type: 'vbox',
            align: 'stretch',
            padding: 10
        }
    });
});