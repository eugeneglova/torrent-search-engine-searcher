/*global define*/

define([
    'backbone',
    './views/engines'
], function (Backbone, EnginesView) {
    'use strict';

    var Engines = Backbone.UIController.extend({

        namespace: 'ui:engines',

        listeners: {
            'data:engines:ready':   'onDataEnginesReady',
            'ui:iframe:open':       'onIframeOpen'
        },

        el: null,

        views: null,

        // Reference to the engines collection
        engines: null,

        initialize: function() {
            this.el = $('.sidebar');

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

            this.listenTo(this.views.engines, 'open-engine-by-id', this.openEngineById, this);

            this.render();

            return true;
        },

        onIframeOpen: function() {
            this.request('data:state:get:engine-id', this.onGetEngineId, this);

            return true;
        },

        onGetEngineId: function(engine_id) {
            this.views.engines.setActiveItemById(engine_id);

            this.render();

            return true;
        },

        render: function() {
            this.views.engines.render();

            this.el.append(this.views.engines.$el);

            return this;
        },

        openEngineById: function(engine_id) {
            this.request('data:state:set:engine-id', engine_id);

            this.request('ui:iframe:open');

            return true;
        }

    });

    return Engines;
});
