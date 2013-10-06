/*global define*/

define([
    'backbone',
    './views/searches'
], function (Backbone, RecentSearchesView) {
    'use strict';

    var RecentSearches = Backbone.UIController.extend({

        namespace: 'ui:recent-searches',

        listeners: {
            'data:search-log:ready':    'onDataSearchLogReady',
            'ui:page:opened:home':      'onPageOpenedHome'
        },

        el: null,

        views: null,

        // Reference to the search log collection
        search_log: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        onDataSearchLogReady: function() {
            this.request('data:search-log:get', this.onDataSearchLogGet, this);

            return true;
        },

        onPageOpenedHome: function() {
            this.render();

            return true;
        },

        onDataSearchLogGet: function(search_log) {
            this.search_log = search_log;

            this.views.recent_searches = new RecentSearchesView({
                collection: this.search_log
            });

            return true;
        },

        render: function() {
            this.el = $('#recent-searches');

            this.el.append(this.views.recent_searches.render().$el);

            return this;
        }

    });

    return RecentSearches;
});
