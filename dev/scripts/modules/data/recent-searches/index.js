/*global define*/

define([
    'underscore',
    'components/data-remote-collection/index',
    './collections/recent-searches'
], function (_, DataRemoteCollection, RecentSearchesCollection) {
    'use strict';

    var RecentSearches = DataRemoteCollection.extend({

        namespace: 'data:recent-searches',

        listeners: _.extend({}, DataRemoteCollection.prototype.listeners, {
            'data:engines:ready': 'onDataEnginesReady'
        }),

        remote_collection_constructor: RecentSearchesCollection,


        initialize: function() {
            DataRemoteCollection.prototype.initialize.apply(this, arguments);

            this.listenTo(this.collections.remote, 'reset', this.onRecentSearchesReset, this);

            return this;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onRecentSearchesReset: function() {
            if (this.collections.engines) {
                this.collections.remote.engines = this.collections.engines;
            }

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.collections.engines = engines;

            this.collections.remote.engines = this.collections.engines;

            return true;
        }

    });

    return RecentSearches;
});
