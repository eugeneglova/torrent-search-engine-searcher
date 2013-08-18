/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    './collections/engines'
], function ($, _, Backbone, EnginesCollection) {
    'use strict';

    var EnginesView = Backbone.UIModule.extend({

        // Reference to the engines collection
        engines: null,

        listeners: {
            'data:engines:ready': 'onDataEnginesReady'
        },

        initialize: function() {
            // Initialize engines collection
            this.engines = new EnginesCollection();

            return this;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            this.render();

            return true;
        },

        render: function() {
            this.$el;

            return this;
        }

    });

    return EnginesView;
});
