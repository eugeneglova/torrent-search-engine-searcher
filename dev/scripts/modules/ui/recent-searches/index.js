/*global define*/

define([
    'backbone',
    './views/searches'
], function (Backbone, RecentSearchesView) {
    'use strict';

    var RecentSearches = Backbone.UIController.extend({

        namespace: 'ui:recent-searches',

        listeners: {
            'data:recent-searches:ready':   'onRecentSearchesReady',
            'ui:page:opened:home':          'onPageOpenedHome',
            'ui:iframe:open':               'remove',
            'ui:engines:open':              'remove',
            'ui:sites:open':                'remove',
            'ui:site:open':                 'remove'
        },

        views: null,

        is_rendered: null,

        // Reference to the search log collection
        search_log: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onRecentSearchesReady: function() {
            this.request('data:recent-searches:get', this.onRecentSearchesGet, this);

            return true;
        },

        onPageOpenedHome: function() {
            this.render();

            return true;
        },

        onRecentSearchesGet: function(search_log) {
            this.search_log = search_log;

            this.views.recent_searches = new RecentSearchesView({
                collection: this.search_log
            });

            return true;
        },

        onSearch: function(search) {
            this.request('data:state:set', 'query', search.query);

            this.request('data:state:set', 'engine-id', search.engine_id);

            this.request('ui:iframe:open');

            return true;
        },

        render: function() {
            this.views.recent_searches.setElement('#recent-searches');

            this.views.recent_searches.render();

            this.listenTo(this.views.recent_searches, 'search', this.onSearch, this);

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
        }

    });

    return RecentSearches;
});
