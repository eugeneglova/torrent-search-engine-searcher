/*global define*/

define([
    'backbone',
    './views/searches'
], function (Backbone, TopSearchesView) {
    'use strict';

    var TopSearches = Backbone.UIController.extend({

        namespace: 'ui:top-searches',

        listeners: {
            'data:top-searches:ready':  'onTopSearchesReady',
            'ui:page:opened:home':      'onPageOpenedHome',
            'ui:iframe:open':           'remove',
            'ui:engines:open':          'remove',
            'ui:sites:open':            'remove',
            'ui:site:open':             'remove'
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

        onTopSearchesReady: function() {
            this.request('data:top-searches:get', this.onTopSearchesGet, this);

            return true;
        },

        onPageOpenedHome: function() {
            this.render();

            return true;
        },

        onTopSearchesGet: function(search_log) {
            this.search_log = search_log;

            this.views.top_searches = new TopSearchesView({
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
            this.views.top_searches.setElement('#top-searches');

            this.views.top_searches.render();

            this.listenTo(this.views.top_searches, 'search', this.onSearch, this);

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

    return TopSearches;
});
