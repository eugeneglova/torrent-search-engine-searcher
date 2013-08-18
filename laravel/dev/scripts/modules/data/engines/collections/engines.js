/*global define*/

define([
    'underscore',
    'backbone',
    '../models/engine'
], function (_, Backbone, EngineModel) {
    'use strict';

    var EnginesCollection = Backbone.Collection.extend({

        model: EngineModel,

        url: 'api/v1/engines'

    });

    return EnginesCollection;
});
