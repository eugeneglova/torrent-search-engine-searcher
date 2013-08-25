/*global define*/

define([
    'backbone',
    '../models/engine'
], function (Backbone, EngineModel) {
    'use strict';

    var EnginesCollection = Backbone.Collection.extend({

        model: EngineModel,

        url: 'api/v1/engines'

    });

    return EnginesCollection;
});
