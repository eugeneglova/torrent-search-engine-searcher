/*global define*/

define([
    'underscore',
    'components/data-collection/index',
    './collections/remote-engines',
    './collections/local-engines'
], function (_, DataCollection, RemoteEnginesCollection, LocalEnginesCollection) {
    'use strict';

    var UserEngines = DataCollection.extend({

        namespace: 'data:user-engines',

        listeners: _.extend({}, DataCollection.prototype.listeners, {
            ':sort':                'onSort',
            ':add':                 'onAdd',
            ':remove':              'onRemove',
            'data:engines:ready':   'onDataEnginesReady'
        }),

        setting_version_key: 'version_engines',

        local_storage_key: 'user-engines',

        // Remote collection constructor
        remote_collection_constructor: RemoteEnginesCollection,

        // Local collection constructor
        local_collection_constructor: LocalEnginesCollection,

        // Reference to the data engines collection
        engines: null,

        onLocalReset: function() {
            if (!this.collections.local.length) {
                // Fetch remote collection
                this.collections.remote.fetch({ reset: true });

                return false;
            }

            if (this.is_new_version) {
                this.update();
            }

            this.announce('ready');

            return true;
        },

        onRemoteReset: function() {
            var visible_engines;

            if (!this.collections.remote.length) return false;

            if (this.collections.local.length) return false;

            // Get visible engines only
            visible_engines = this.collections.remote.getVisible();

            if (!visible_engines.length) return false;

            // Remove any relations to old collection
            visible_engines = visible_engines.map(function(model) {
                return model.toJSON();
            });

            // Predefine user engines collection with default visible engines
            this.collections.local.reset(visible_engines);

            // Save user engines collection to the local storage
            this.collections.local.save();

            return true;
        },

        update: function() {
            // Update user engines collection with new data
            this.collections.local.forEach(function(model) {
                var local_model;

                local_model = this.collections.remote.get(model.id);

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
            this.collections.local.save();

            return true;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            return true;
        },

        onSort: function(sort_array) {
            if (!sort_array || !sort_array.length) return false;

            sort_array.forEach(function(id, index) {
                this.collections.local.get(id).set({ sort: index + 1 }).save();
            }, this);

            this.collections.local.sort();

            this.request('service:analytics:event', 'user-engines', 'sort');

            return true;
        },

        onAdd: function(engine_id) {
            var engine = this.engines.get(engine_id);

            if (!engine) return false;

            this.collections.local.create(engine.toJSON());

            this.request('service:analytics:event', 'user-engines', 'add', engine.get('name_stripped'));

            return true;
        },

        onRemove: function(engine_id) {
            var engine = this.collections.local.get(engine_id);

            if (!engine) return false;

            this.request('service:analytics:event', 'user-engines', 'remove', engine.get('name_stripped'));

            engine.destroy();

            this.collections.local.remove(engine);

            return true;
        }

    });

    return UserEngines;
});
