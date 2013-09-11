/*global define*/

define([
    'backbone',
    '../models/setting',
    'localstorage'
], function (Backbone, SettingModel, LocalStorage) {
    'use strict';

    var LocalSettingsCollection = Backbone.Collection.extend({

        model: SettingModel,

        localStorage: new LocalStorage('settings'),

        save: function() {
            _.invoke(this.toArray(), 'save');

            return true;
        },

        clear: function() {
            this.localStorage._clear();

            return true;
        }

    });

    return LocalSettingsCollection;
});
