/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    './collections/engines'
], function ($, _, Backbone, EnginesCollection) {
    'use strict';

    var EnginesView = Backbone.Module.extend({

        // Reference to the engines collection
        engines: null,

        events: {
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

            return true;
        },

        render: function() {
            return this;
        }

    });

    return EnginesView;
});
