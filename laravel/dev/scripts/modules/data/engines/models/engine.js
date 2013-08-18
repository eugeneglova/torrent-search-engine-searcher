/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var EngineModel = Model.extend({
        defaults: {
            id:     null,
            name:   null
        }
    });

    return EngineModel;
});
