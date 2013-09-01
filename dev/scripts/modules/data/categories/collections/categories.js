/*global define*/

define([
    'backbone',
    '../models/category'
], function (Backbone, CategoryModel) {
    'use strict';

    var CategoriesCollection = Backbone.Collection.extend({

        model: CategoryModel,

        url: function() {
            if (!this.engine_id) return false;

            return '/api/v1/engines/' + this.engine_id + '/categories';
        },

        // Reference to engine id
        engine_id: null,

        setEngineId: function(engine_id) {
            this.engine_id = engine_id;

            return true;
        }

    });

    return CategoriesCollection;
});
