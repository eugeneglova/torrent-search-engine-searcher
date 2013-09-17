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
            ':user:add':                                'onUserEnginesAdd',
            ':user:remove':                             'onUserEnginesRemove',
            'data:settings:changed:version_engines':    'onDataSettingsChangedVersionEngines',
            'data:settings:ready':                      'onDataSettingsReady'
        },

        // Flag indicates that remote engines collection is updated with new version
        is_new_version: null,

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
                collection.get(id).set({ sort: index + 1 }).save();
            }, this);

            collection.sort();

            this.request('service:analytics:event', 'engines', 'sort');

            return true;
        },

        onUserEnginesAdd: function(engine_id) {
            var engine = this.collections.local.get(engine_id);

            if (!engine) return false;

            this.collections.user.create(engine.toJSON());

            this.request('service:analytics:event', 'engines', 'add', engine.get('name_stripped'));

            return true;
        },

        onUserEnginesRemove: function(engine_id) {
            var engine = this.collections.user.get(engine_id);

            if (!engine) return false;

            this.request('service:analytics:event', 'engines', 'remove', engine.get('name_stripped'));

            engine.destroy();

            this.collections.user.remove(engine);

            return true;
        },

        onDataSettingsChangedVersionEngines: function() {
            this.is_new_version = true;

            // Clear local engines collection
            this.collections.local.clear();

            return true;
        },

        onDataSettingsReady: function() {
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
            } else if (this.is_new_version) {
                // Update user engines collection with new data
                this.collections.user.forEach(function(model) {
                    var local_model;

                    local_model = this.collections.local.get(model.id);

                    if (!local_model) {
                        // Remove user engine if it doesn't exist in local engines collection after update
                        model.destroy();

                        return false;
                    }

                    // Update user engines collection model omitting sort
                    // to retain user saved value
                    model.set(local_model.omit('sort'));
                }, this);

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
