/*global define*/

define([
    'backbone',
    '../models/category'
], function (Backbone, CategoryModel) {
    'use strict';

    var CategoriesCollection = Backbone.Collection.extend({

        model: CategoryModel,

        // Reference to engine id
        engine_id: null,

        url: function() {
            if (!this.engine_id) return false;

            return '/api/v1/engines/' + this.engine_id + '/categories';
        },

        initialize: function(options) {
            this.engine_id = options.engine_id;

            return this;
        }

    });

    return CategoriesCollection;
});
