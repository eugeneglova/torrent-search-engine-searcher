/*global define*/

define([
    'backbone',
    './views/engines'
], function (Backbone, AvailableEnginesView) {
    'use strict';

    var AvailableEngines = Backbone.UIController.extend({

        namespace: 'ui:available-engines',

        listeners: {
            ':toggle':  'onToggle',
            ':open':    'onOpen',
            ':close':   'onClose'
        },

        el: null,

        views: null,

        is_rendered: null,

        // Reference to the engines collection
        engines: null,

        initialize: function() {
            this.el = $('.app-row');

            this.views = {};

            this.views.engines = new AvailableEnginesView();

            return this;
        },

        onToggle: function() {
            this.isRendered() ? this.onClose() : this.onOpen();

            return true;
        },

        onOpen: function() {
            this.request('data:engines:get:available', this.onDataEnginesGetAvailable, this);

            return true;
        },

        onClose: function() {
            this.remove();

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataEnginesGetAvailable: function(engines) {
            this.engines = engines;

            this.views.engines.setEngines(this.engines);

            this.render();

            return true;
        },


        onGetEngineId: function(engine_id) {
            this.views.engines.setActiveItemById(engine_id);

            this.render();

            return true;
        },

        render: function() {
            this.listenTo(this.views.engines, 'open-engine-by-id', this.openEngineById, this);

            this.views.engines.render();

            this.el.append(this.views.engines.$el);

            this.is_rendered = true;

            return this;
        },

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            return true;
        },

        openAvailableEngineById: function(engine_id) {
            this.request('data:state:set:engine-id', engine_id);

            this.request('ui:iframe:open');

            return true;
        }

    });

    return AvailableEngines;
});
