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
            'ui:navbar:ready':      'onNavbarReady'
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

            this.listenTo(this.views.engines, 'set-active-engine-id', this.onSetActiveEngineId, this);

            this.render();

            return true;
        },

        onNavbarReady: function() {
            if (this.views.engines) {
                this.views.engines.resize();
            }

            return true;
        },

        render: function() {
            this.views.engines.render();

            this.el.append(this.views.engines.$el);

            return this;
        },

        onSetActiveEngineId: function(engine_id) {
            this.request('data:state:set:engine-id', engine_id);

            this.request('ui:iframe:open');

            this.views.engines.setActiveEngineId(engine_id);

            this.render();

            return true;
        }

    });

    return Engines;
});
