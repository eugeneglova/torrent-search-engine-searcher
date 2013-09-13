/*global define*/

define([
    'backbone',
    './collections/remote-engines',
    './collections/local-engines',
    './collections/user-engines'
], function (Backbone, RemoteEnginesCollection, LocalEnginesCollection, UserEnginesCollection) {
    'use strict';

    var Engines = Backbone.Controller.extend({

        namespace: 'data:engines',

        listeners: {
            ':get':                                     'onGet',
            ':sort':                                    'onSort',
            'data:settings:changed:version_engines':    'onDataSettingsChangedVersionEngines'
        },

        // Reference to the object with engines collections
        collections: null,

        initialize: function() {
            this.collections =  {};

            // Initialize remote engines collection
            this.collections.remote = new RemoteEnginesCollection();

            // Initialize local engines collection
            this.collections.local = new LocalEnginesCollection();

            // Initialize user collection
            this.collections.user = new UserEnginesCollection();

            this.listenTo(this.collections.remote, 'reset', this.onRemoteEnginesReset, this);
            this.listenTo(this.collections.local, 'reset', this.onLocalEnginesReset, this);
            this.listenTo(this.collections.user, 'reset', this.onUserEnginesReset, this);

            this.collections.local.fetch({ reset: true });

            return this;
        },

        onGet: function(key, callback, context) {
            var collection = this.collections[key];

            if (!collection) return false;

            callback.call(context, collection);

            return true;
        },

        onSort: function(key, sort_array) {
            var collection = this.collections[key];

            if (!collection) return false;

            if (!sort_array || !sort_array.length) return false;

            sort_array.forEach(function(id, index) {
                collection.get(id).set({ sort: index }).save();
            }, this);

            collection.sort();

            return true;
        },

        onDataSettingsChangedVersionEngines: function() {
            // Clear local engines collection
            this.collections.local.clear();

            // Fetch local collection (when it empty it will fetch remote engines)
            this.collections.local.fetch({ reset: true });

            return true;
        },

        onLocalEnginesReset: function() {
            if (!this.collections.local.length) {
                // Fetch remote engines collection
                this.collections.remote.fetch({ reset: true });
            } else {
                // Fetch user engines collection
                this.collections.user.fetch({ reset: true });
            }

            return true;
        },

        onUserEnginesReset: function() {
            var visible_engines;

            // Check if user engines collection is empty
            if (!this.collections.user.length) {
                // Get visible engines only
                visible_engines = this.collections.local.getVisible();

                // Remove any relations to old collection
                visible_engines = visible_engines.map(function(model) {
                    return model.toJSON();
                });

                // Predefine user engines collection with default visible engines
                this.collections.user.reset(visible_engines, { silent: true });

                // Save user engines collection to the local storage
                this.collections.user.save();
            }

            this.announce('ready');

            return true;
        },

        onRemoteEnginesReset: function() {
            // Check if local engines collection is empty
            if (!this.collections.local.length) {
                // Remove any relations to old collection and copy remote engines collection
                // to the local engines collection for further usage
                this.collections.local.reset(this.collections.remote.toJSON());

                // Save local engines collection to the local storage
                this.collections.local.save();
            }

            return true;
        }

    });

    return Engines;
});
