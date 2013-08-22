/*global define*/

define([
    'backbone',
    './views/engines'
], function (Backbone, EnginesView) {
    'use strict';

    var Engines = Backbone.UIController.extend({

        namespace: 'ui:engines',

        listeners: {
            'data:engines:ready': 'onDataEnginesReady'
        },

        el: null,

        views: null,

        // Reference to the engines collection
        engines: null,

        initialize: function() {
            this.el = $('.engines');

            this.views = {};

            return this;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            this.views.engines = new EnginesView({
                collection: this.engines
            });

            this.listenTo(this.engines, 'set-engine-id', this.onSetEngineId, this);

            this.render();

            return true;
        },

        render: function() {
            this.views.engines.render();

            // Set primary engine
            this.announce('primary', this.engines.at(1).id);

            this.el.append(this.views.engines.$el);

            return this;
        },

        onSetEngineId: function(engine_id) {
            this.request('data:search:set:engine-id', engine_id);

            this.request('data:search:submit');

            return true;
        }

    });

    return Engines;
});
