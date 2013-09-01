/*global define*/

define([
    'backbone',
    './collections/categories'
], function (Backbone, CategoriesCollection) {
    'use strict';

    var Categories = Backbone.Controller.extend({

        namespace: 'data:categories',

        listeners: {
            ':get': 'onGet'
        },

        // Reference to the categories collection
        categories: null,

        callback: null,

        context: null,

        initialize: function() {
            // Initialize categories collection
            this.categories = new CategoriesCollection();

            this.listenTo(this.categories, 'reset', this.onCategoriesReset, this);

            this.announce('ready');

            return this;
        },

        onGet: function(callback, context) {
            this.callback = callback;

            this.context = context;

            this.request('data:state:get:engine-id', this.onGetEngineId, this)

            return true;
        },

        onGetEngineId: function(engine_id) {
            this.categories.setEngineId(engine_id);

            this.categories.fetch({ reset: true });

            return true;
        },

        onCategoriesReset: function() {
            this.callback.apply(this.context, [this.categories]);

            return true;
        }

    });

    return Categories;
});
