/*global define*/

define([
    'underscore',
    'components/data-remote-collection/index',
    './collections/search-log'
], function (_, DataRemoteCollection, SearchLogCollection) {
    'use strict';

    var SearchLog = DataRemoteCollection.extend({

        namespace: 'data:search-log',

        listeners: _.extend({}, DataRemoteCollection.prototype.listeners, {
            'data:engines:ready': 'onDataEnginesReady'
        }),

        remote_collection_constructor: SearchLogCollection,


        initialize: function() {
            DataRemoteCollection.prototype.initialize.apply(this, arguments);

            this.listenTo(this.collections.remote, 'reset', this.onSearchLogReset, this);

            return this;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onSearchLogReset: function() {
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

    return SearchLog;
});
