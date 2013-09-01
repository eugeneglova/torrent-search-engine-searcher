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

        // Reference to the categories collections object
        categories: null,

        callback: null,

        context: null,

        initialize: function() {
            this.categories = {};

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
            var categories_callback = this.onCategoriesReset(engine_id);

            if (!this.categories[engine_id]) {
                // Initialize categories collection
                this.categories[engine_id] = new CategoriesCollection({
                    engine_id: engine_id
                });

                this.listenTo(this.categories[engine_id], 'reset', categories_callback, this);

                this.categories[engine_id].fetch({ reset: true });
            } else {
                categories_callback();
            }

            return true;
        },

        onCategoriesReset: function(engine_id) {
            return function() {
                this.callback.apply(this.context, [this.categories[engine_id]]);

                return true;
            }.bind(this);
        }

    });

    return Categories;
});
