/*global define*/

define([
    'backbone',
    './collections/engines'
], function (Backbone, EnginesCollection) {
    'use strict';

    var Engines = Backbone.Controller.extend({

        namespace: 'data:engines',

        // Reference to the engines collection
        engines: null,

        listeners: {
            ':get': 'onGet'
        },

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

        onEnginesReset: function() {
            this.announce('ready');

            return true;
        }

    });

    return Engines;
});
