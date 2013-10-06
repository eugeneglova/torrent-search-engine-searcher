/*global define*/

define([
    'underscore',
    'components/data-remote-collection/index',
    './collections/top-searches'
], function (_, DataRemoteCollection, TopSearchesCollection) {
    'use strict';

    var TopSearches = DataRemoteCollection.extend({

        namespace: 'data:top-searches',

        listeners: _.extend({}, DataRemoteCollection.prototype.listeners, {
            'data:engines:ready': 'onDataEnginesReady'
        }),

        remote_collection_constructor: TopSearchesCollection,


        initialize: function() {
            DataRemoteCollection.prototype.initialize.apply(this, arguments);

            this.listenTo(this.collections.remote, 'reset', this.onTopSearchesReset, this);

            return this;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onTopSearchesReset: function() {
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

    return TopSearches;
});
