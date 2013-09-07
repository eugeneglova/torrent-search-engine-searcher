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

        initialize: function() {
            this.categories = {};

            this.announce('ready');

            return this;
        },

        onGet: function(callback, context) {
            this.request('data:state:get:engine-id', this.onGetEngineId(callback, context), this);

            return true;
        },

        onGetEngineId: function(callback, context) {
            return function(engine_id) {
                var categories_callback = this.onCategoriesReset(engine_id, callback, context);

                if (!this.categories[engine_id]) {
                    // Initialize categories collection
                    this.categories[engine_id] = {
                        collection: new CategoriesCollection(undefined, {
                            engine_id: engine_id
                        }),
                        is_reset_complete: false
                    };

                    this.listenTo(this.categories[engine_id].collection, 'reset', categories_callback, this);

                    this.categories[engine_id].collection.fetch({ reset: true });
                } else if (!this.categories[engine_id].is_reset_complete) {
                    this.listenToOnce(this.categories[engine_id].collection, 'reset', categories_callback, this);
                } else {
                    categories_callback();
                }

                return true;
            }.bind(this);
        },

        onCategoriesReset: function(engine_id, callback, context) {
            return function() {
                this.categories[engine_id].is_reset_complete = true;

                callback.apply(context, [this.categories[engine_id].collection]);

                return true;
            }.bind(this);
        }

    });

    return Categories;
});
