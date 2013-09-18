/*global define*/

define([
    'backbone',
    './views/engines'
], function (Backbone, EnginesView) {
    'use strict';

    var UserEngines = Backbone.UIController.extend({

        namespace: 'ui:user-engines',

        listeners: {
            'data:user-engines:ready':  'onDataUserEnginesReady',
            'ui:iframe:opened':         'onIframeOpen',
            'ui:window:resized':        'onWindowResized'
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

        onDataUserEnginesReady: function() {
            this.request('data:user-engines:get', this.onDataUserEnginesGet, this);

            return true;
        },

        onDataUserEnginesGet: function(engines) {
            this.engines = engines;

            this.views.engines = new EnginesView({
                collection: this.engines
            });

            this.listenTo(this.views.engines, 'open-engine-by-id', this.openEngineById, this);

            this.listenTo(this.views.engines, 'add-engine-by-id', this.addEngineById, this);

            this.listenTo(this.views.engines, 'remove-engine-by-id', this.removeEngineById, this);

            this.listenTo(this.views.engines, 'sort-update', this.onSortUpdate, this);

            this.render();

            return true;
        },

        onIframeOpen: function() {
            this.request('data:state:get', 'engine-id', this.onGetEngineId, this);

            return true;
        },

        onGetEngineId: function(engine_id) {
            this.views.engines.setActiveItemById(engine_id);

            return true;
        },

        onSortUpdate: function(sort_array) {
            this.request('data:user-engines:sort', sort_array);

            return true;
        },

        onWindowResized: function() {
            if (!this.views.engines) return false;

            this.views.engines.resize();

            return true;
        },

        render: function() {
            this.views.engines.render();

            this.el.append(this.views.engines.$el);

            return this;
        },

        openEngineById: function(engine_id) {
            this.request('data:state:set', 'engine-id', engine_id);

            this.request('ui:iframe:open');

            return true;
        },

        addEngineById: function(engine_id) {
            this.request('data:user-engines:add', engine_id);

            return true;
        },

        removeEngineById: function(engine_id) {
            this.request('data:user-engines:remove', engine_id);

            return true;
        }

    });

    return UserEngines;
});
