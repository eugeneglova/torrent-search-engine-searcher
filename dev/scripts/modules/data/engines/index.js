/*global define*/

define([
    'backbone',
    './collections/engines',
    './collections/available-engines'
], function (Backbone, EnginesCollection, AvailableEnginesCollection) {
    'use strict';

    var Engines = Backbone.Controller.extend({

        namespace: 'data:engines',

        listeners: {
            ':get':             'onGet',
            ':get:available':   'onGetAvailable'
        },

        // Reference to the engines collection
        engines: null,

        // Reference to the available engines collection
        available_engines: null,

        initialize: function() {
            // Initialize engines collection
            this.engines = new EnginesCollection();

            this.listenTo(this.engines, 'reset', this.onEnginesReset, this);

            this.engines.fetch({ reset: true });

            return this;
        },

        onGet: function(callback, context) {
            callback.apply(context, [this.engines]);

            return true;
        },

        onGetAvailable: function(callback, context) {
            if (!this.available_engines) {
                // Initialize available engines collection
                this.available_engines = {
                    collection: new AvailableEnginesCollection(),
                    is_reset_complete: false
                };

                this.listenTo(this.available_engines.collection, 'reset', this.onAvailableEnginesReset(callback, context), this);

                this.available_engines.collection.fetch({ reset: true });
            } else if (!this.available_engines.is_reset_complete) {
                this.listenToOnce(this.available_engines.collection, 'reset', this.onAvailableEnginesReset(callback, context), this);
            } else {
                this.onAvailableEnginesReset(callback, context)();
            }

            return true;
        },

        onAvailableEnginesReset: function(callback, context) {
            return function() {
                this.available_engines.is_reset_complete = true;

                callback.apply(context, [this.available_engines.collection]);

                return true;
            }.bind(this);
        },

        onEnginesReset: function() {
            this.announce('ready');

            return true;
        }

    });

    return Engines;
});
