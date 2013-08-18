/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var EngineModel = Backbone.Model.extend({
        defaults: {
            id:     null,
            name:   null
        }
    });

    return EngineModel;
});
