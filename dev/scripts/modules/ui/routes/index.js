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
            'data:sites:ready':     'onDataSitesReady',
            'data:groups:ready':    'onDataGroupsReady',
            'data:pages:ready':     'onDataPagesReady',
            'app:loader:ready':     'onLoaderReady'
        },

        // Reference to the routers object
        routers: null,

        // Reference to the engines collection
        engines: null,

        // Reference to the sites collection
        sites: null,

        // Reference to the groups collection
        groups: null,

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

        onDataSitesReady: function() {
            this.request('data:sites:get', this.onDataSitesGet, this);

            return true;
        },

        onDataSitesGet: function(sites) {
            this.sites = sites;

            return true;
        },

        onDataGroupsReady: function() {
            this.request('data:groups:get', this.onDataGroupsGet, this);

            return true;
        },

        onDataGroupsGet: function(groups) {
            this.groups = groups;

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
            var group;

            group = this.groups.findWhere({ slug: group_slug });

            this.request('data:state:set', 'group-id', group ? group.id : undefined);

            this.request('ui:engines:open');

            return true;
        },

        onOpenSite: function(group_slug, site_slug) {
            var group, site;

            group = this.groups.findWhere({ slug: group_slug });

            if (!group) return false;

            site = this.sites.findWhere({ site_group_id: group.id, slug: site_slug });

            if (!site) return false;

            this.request('data:state:set', 'site-id', site.id);

            this.request('ui:site:open');

            return true;
        },

        onOpenSites: function(group_slug) {
            var group;

            group = this.groups.findWhere({ slug: group_slug });

            this.request('data:state:set', 'group-id', group ? group.id : undefined);

            this.request('ui:sites:open');

            return true;
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
        }

    });

    return Routes;
});
