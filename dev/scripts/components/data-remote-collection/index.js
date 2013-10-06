/*global define*/

define([
    'backbone',
    './collections/remote'
], function (Backbone, RemoteCollection) {
    'use strict';

    var DataRemoteCollection = Backbone.Controller.extend({

        namespace: 'data:remote-collection',

        listeners: {
            ':get': 'onGet'
        },

        // Remote collection constructor
        remote_collection_constructor: RemoteCollection,

        // Reference to the object with remote and local collections
        collections: null,

        initialize: function() {
            this.collections =  {};

            // Initialize remote collection
            this.collections.remote = new this.remote_collection_constructor();

            this.listenTo(this.collections.remote, 'reset', this.onRemoteReset, this);

            this.collections.remote.fetch({ reset: true });

            return this;
        },

        onGet: function(callback, context) {
            callback.call(context, this.collections.remote);

            return true;
        },

        onRemoteReset: function() {
            this.announce('ready');

            return true;
        }

    });

    return DataRemoteCollection;
});
