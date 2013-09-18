/*global define*/

define([
    'components/data-collection/collections/remote',
    '../models/engine'
], function (RemoteCollection, EngineModel) {
    'use strict';

    var RemoteEnginesCollection = RemoteCollection.extend({

        model: EngineModel,

        url: '/api/v1/engines',

        comparator: function(model) {
            return model.get('sort');
        },

        getVisible: function() {
            return this.filter(function (model) {
                return Number(model.get('visible')) === 1;
            });
        }

    });

    return RemoteEnginesCollection;
});
