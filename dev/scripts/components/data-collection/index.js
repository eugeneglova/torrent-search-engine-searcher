/*global define*/

define([
    'backbone',
    './collections/remote',
    './collections/local'
], function (Backbone, RemoteCollection, LocalCollection) {
    'use strict';

    var DataCollection = Backbone.Controller.extend({

        namespace: 'data:collection',

        listeners: {
            ':get':                     'onGet',
            'data:settings:changed':    'onDataSettingsChanged',
            'data:settings:ready':      'onDataSettingsReady'
        },

        // Settings model id of version to update data from remote model
        setting_version_key: null,

        // Local storage key for local collection
        local_storage_key: 'data-collection',

        // Remote collection constructor
        remote_collection_constructor: RemoteCollection,

        // Local collection constructor
        local_collection_constructor: LocalCollection,

        // Flag indicates that remote collection is updated with new version
        is_new_version: null,

        // Reference to the object with remote and local collections
        collections: null,

        initialize: function() {
            this.collections =  {};

            // Initialize remote collection
            this.collections.remote = new this.remote_collection_constructor();

            // Initialize local collection
            this.collections.local = new this.local_collection_constructor(undefined, { local_storage_key: this.local_storage_key });

            this.listenTo(this.collections.remote, 'reset', this.onRemoteReset, this);
            this.listenTo(this.collections.local, 'reset', this.onLocalReset, this);

            return this;
        },

        onGet: function(callback, context) {
            callback.call(context, this.collections.local);

            return true;
        },

        onDataSettingsChanged: function(model) {
            if (!model.hasChanged('value')) return false;

            this.is_new_version = true;

            // Clear local collection
            this.collections.local.clear();

            return true;
        },

        onDataSettingsReady: function() {
            // Fetch local collection (when it empty it will fetch remote)
            this.collections.local.fetch({ reset: true });

            return true;
        },

        onLocalReset: function() {
            if (!this.collections.local.length) {
                // Fetch remote collection
                this.collections.remote.fetch({ reset: true });

                return false;
            }

            this.announce('ready');

            return true;
        },

        onRemoteReset: function() {
            // Check if local collection is empty
            if (!this.collections.local.length) {
                // Remove any relations to old collection and copy remote collection
                // to the local collection for further usage
                this.collections.local.reset(this.collections.remote.toJSON());

                // Save local collection to the local storage
                this.collections.local.save();
            }

            return true;
        }

    });

    return DataCollection;
});
