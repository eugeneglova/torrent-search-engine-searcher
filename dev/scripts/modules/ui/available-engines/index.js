/*global define*/

define([
    'backbone',
    './views/engines'
], function (Backbone, AvailableEnginesView) {
    'use strict';

    var AvailableEngines = Backbone.UIController.extend({

        namespace: 'ui:available-engines',

        listeners: {
            ':open':                'onOpen',
            'ui:window:resized':    'onWindowResized',
            'ui:page:open':         'remove',
            'ui:iframe:open':       'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        // Reference to the engines collection
        engines: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.engines = new AvailableEnginesView();

            return this;
        },

        onOpen: function() {
            this.request('data:engines:get:available', this.onDataEnginesGetAvailable, this);

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataEnginesGetAvailable: function(engines) {
            this.engines = engines;

            this.views.engines.setEngines(this.engines);

            this.render();

            this.request('ui:routes:set', 'available-engines');

            this.request('ui:head:set', {
                head_title:         'All Avaialble BitTorrent Search Engines - TorrentScan',
                head_description:   'More than 1000 avaialble BitTorrent search engines in one place. You can search torrents with all these torrent search engines.'
            });

            return true;
        },


        onGetEngineId: function(engine_id) {
            this.views.engines.setActiveItemById(engine_id);

            this.render();

            return true;
        },

        onWindowResized: function() {
            if (!this.views.engines) return false;

            this.views.engines.resize();

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
            if (!this.isRendered()) return false;

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
