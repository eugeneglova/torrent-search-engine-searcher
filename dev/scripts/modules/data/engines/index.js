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
            ':get': 'onGet'
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
            if (!this.collections[key]) return false;

            callback.call(context, this.collections[key]);

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
                // Remove any relations to old collection
                // and copy remote engines collection to the local storage
                this.collections.local.reset(this.collections.remote.toJSON());

                // Save local engines collection to the local storage
                this.collections.local.save();
            }

            return true;
        }

    });

    return Engines;
});
