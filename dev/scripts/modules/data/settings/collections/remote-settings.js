/*global define*/

define([
    'backbone',
    '../models/setting'
], function (Backbone, SettingModel) {
    'use strict';

    var RemoteSettingsCollection = Backbone.Collection.extend({

        model: SettingModel,

        url: '/api/v1/settings'

    });

    return RemoteSettingsCollection;
});
