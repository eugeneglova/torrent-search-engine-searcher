/*global define*/

define([
    'backbone',
    '../models/engine'
], function (Backbone, EngineModel) {
    'use strict';

    var EnginesCollection = Backbone.Collection.extend({

        model: EngineModel,

        url: '/api/v1/engines',

        comparator: function(model) {
            return model.get('sort');
        },

        getVisible: function() {
            return this.filter(function (model) {
                return model.get('visible');
            });
        }

    });

    return EnginesCollection;
});
