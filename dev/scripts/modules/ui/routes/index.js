/*global define*/

define([
    'backbone',
    './routes/engines',
    './routes/pages'
], function (Backbone, EnginesRouter, PagesRouter) {
    'use strict';

    var Routes = Backbone.UIController.extend({

        namespace: 'ui:routes',

        listeners: {
            ':set':                 'onSet',
            'data:engines:ready':   'onDataEnginesReady',
            'data:pages:ready':     'onDataPagesReady',
            'app:loader:ready':     'onLoaderReady'
        },

        // Reference to the routers object
        routers: null,

        // Reference to the engines collection
        engines: null,

        initialize: function() {
            this.routers = {};

            return this;
        },

        onSet: function(route) {
            Backbone.history.navigate(route);

            return true;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            this.routers.engines = new EnginesRouter({
                collection: this.engines
            });

            this.listenTo(this.routers.engines, 'open-engine-by-id', this.openEngineById, this);

            return true;
        },

        onDataPagesReady: function() {
            this.request('data:pages:get', this.onDataPagesGet, this);

            this.listenTo(this.routers.pages, 'open-page-by-id', this.openPageById, this);

            return true;
        },

        onDataPagesGet: function(pages) {
            this.pages = pages;

            this.routers.pages = new PagesRouter({
                collection: this.pages
            });

            return true;
        },

        onLoaderReady: function() {
            Backbone.history.start({ pushState: true });

            return true;
        },

        openEngineById: function(engine_id) {
            this.request('data:state:set:engine-id', engine_id);

            this.request('ui:iframe:open');

            return true;
        },

        openPageById: function(page_id) {
            this.request('data:state:set:page-id', page_id);

            this.request('ui:page:open');

            return true;
        }

    });

    return Routes;
});
