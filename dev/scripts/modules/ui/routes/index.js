/*global define*/

define([
    'backbone',
    './routes/engines',
    './routes/sites',
    './routes/pages'
], function (Backbone, EnginesRouter, SitesRouter, PagesRouter) {
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

            this.routers.pages = new PagesRouter();

            this.listenTo(this.routers.pages, 'open-page-by-name', this.onOpenPageByName, this);

            this.routers.engines = new EnginesRouter();

            this.listenTo(this.routers.engines, 'open-engine', this.onOpenEngine, this);

            this.listenTo(this.routers.engines, 'open-engines', this.onOpenEngines, this);

            this.routers.sites = new SitesRouter();

            this.listenTo(this.routers.sites, 'open-site', this.onOpenSite, this);

            this.listenTo(this.routers.sites, 'open-sites', this.onOpenSites, this);

            return this;
        },

        onSet: function(route, options) {
            options = options || {};

            Backbone.history.navigate(route, options);

            return true;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            return true;
        },

        onOpenEngine: function(engine_slug, query, category_slug) {
            var engine;

            engine = this.engines.findWhere({ slug: engine_slug });

            if (!engine) return false;

            this.request('data:state:set', 'engine-id', engine.id);

            this.request('data:state:set', 'query', query);

            this.request('data:categories:get', this.onDataCategoriesGet(category_slug), this);

            return true;
        },

        onOpenEngines: function(group_slug) {
            this.request('data:groups:get', this.onDataGroupsGet(group_slug, this.openEngines, this), this);

            return true;
        },

        onOpenSites: function(group_slug) {
            this.request('data:groups:get', this.onDataGroupsGet(group_slug, this.openSites, this), this);

            return true;
        },

        onDataGroupsGet: function(group_slug, callback, context) {
            return function(groups) {
                var group;

                this.groups = groups;

                group = this.groups.findWhere({ slug: group_slug });

                this.request('data:state:set', 'group-id', group ? group.id : null);

                callback.call(context);

                return true;
            };
        },

        onDataCategoriesGet: function(category_slug) {
            return function(categories) {
                var category;

                this.categories = categories;

                category = this.categories.findWhere({ slug: category_slug });

                if (category) {
                    this.request('data:state:set', 'category-id', category.id);
                }

                this.request('ui:iframe:open');

                return true;
            };
        },

        onDataPagesReady: function() {
            this.request('data:pages:get', this.onDataPagesGet, this);

            return true;
        },

        onDataPagesGet: function(pages) {
            this.pages = pages;

            return true;
        },

        onLoaderReady: function() {
            Backbone.history.start({ pushState: true });

            return true;
        },

        onOpenPageByName: function(page) {
            var pages = this.pages.where({ slug: page });

            if (!pages.length) return false;

            this.openPageById(pages[0].id);

            return true;
        },

        openPageById: function(page_id) {
            this.request('data:state:set', 'page-id', page_id);

            this.request('ui:page:open');

            return true;
        },

        openEngines: function() {
            this.request('ui:engines:open');

            return true;
        },

        openSites: function() {
            this.request('ui:sites:open');

            return true;
        }

    });

    return Routes;
});
