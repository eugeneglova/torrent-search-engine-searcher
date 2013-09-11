/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var SettingModel = Model.extend({

        idAttribute: 'key',

        defaults: {
            key:    null,
            value:  null
        }

    });

    return SettingModel;
});
