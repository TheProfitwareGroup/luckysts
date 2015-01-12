/*
 * LuckySTS: Dictionary page
 * @author Sergey Sobko
 * @email: S.Sobko@profitware.ru
 */

Ext.onReady(function () {

    var changeFunction = function () {
        if (termPanel.getSelectionModel().hasSelection()) {
            var settingsWindow;

            var row = termPanel.getSelectionModel().getSelection()[0],
                term_name = row.get('name'),
                term_description = row.get('description');

            var toolbars = [];

            toolbars.push(
                Ext.create('Ext.toolbar.Toolbar', {
                    items: [
                        {
                            xtype: 'label',
                            text: 'Наименование',
                            margin: '0 5 0 5'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'textfield',
                            name: 'name',
                            value: term_name
                        }
                    ],
                    margin: '0 0 5 0'
                })
            );

            toolbars.push(
                Ext.create('Ext.toolbar.Toolbar', {
                    items: [
                        {
                            xtype: 'label',
                            text: 'Описание',
                            margin: '0 5 0 5'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'textarea',
                            name: 'description',
                            value: term_description
                        }
                    ],
                    margin: '0 0 5 0'
                })
            );

            toolbars.push(
                Ext.create('Ext.toolbar.Toolbar', {
                    margin: '0 0 5 0',
                    flex: 1
                })
            );

            toolbars.push(
                Ext.create('Ext.toolbar.Toolbar', {
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: 'Сохранить изменения',
                            handler: function() {
                                settingsWindow.close();
                            }
                        }
                    ],
                    margin: '0 0 5 0'
                })
            );

            settingsWindow = Ext.create("Ext.Window", {
                title : 'LuckySTS',
                width : 500,
                height: 250,
                items: toolbars,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    padding: 10
                }
            }).show();

        } else {
            Ext.MessageBox.alert('LuckySTS',
                'Выберите строку.');
        }
    };

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
        title: 'Словарь',
        height: 500,
        listeners : {
            itemdblclick: changeFunction
        }
    });

    var settingsButton = Ext.create('Ext.button.Button', {
        text: '<b>Добавить / Изменить</b>',
        handler: changeFunction
    });

    var termToolbar = Ext.create('Ext.toolbar.Toolbar', {
        items: [
            settingsButton
        ],
        margin: '0 0 5 0'
    });

    // Main viewport
    Ext.create('Ext.container.Viewport', {
        items: [
            Ext.getCmp('mainToolbar'),
            termToolbar,
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