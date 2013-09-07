/*global define*/

define([
    'backbone',
    '../models/engine'
], function (Backbone, EngineModel) {
    'use strict';

    var AvailableEnginesCollection = Backbone.Collection.extend({

        model: EngineModel,

        url: '/api/v1/available-engines'

    });

    return AvailableEnginesCollection;
});
