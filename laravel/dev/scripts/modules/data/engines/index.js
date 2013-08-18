/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    './collections/engines'
], function ($, _, Backbone, EnginesCollection) {
    'use strict';

    var EnginesView = Backbone.Module.extend({

        namespace: 'data:engines',

        // Reference to the engines collection
        engines: null,

        listeners: {
            ':get': 'onGet'
        },

        initialize: function() {
            // Initialize engines collection
            this.engines = new EnginesCollection();

            this.listenTo(this.engines, 'sync', this.onEnginesSync, this);

            this.engines.fetch();

            return this;
        },

        onGet: function(callback, context) {
            callback.apply(context, [this.engines]);

            return true;
        },

        onEnginesSync: function() {
            this.announce('ready');

            return true;
        }

    });

    return EnginesView;
});
