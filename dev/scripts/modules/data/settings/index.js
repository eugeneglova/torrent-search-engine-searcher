/*global define*/

define([
    'backbone',
    './collections/remote-settings',
    './collections/local-settings'
], function (Backbone, RemoteSettingsCollection, LocalSettingsCollection) {
    'use strict';

    var Settings = Backbone.Controller.extend({

        namespace: 'data:settings',

        // Reference to the collections object
        collections: null,

        listeners: {
            ':get': 'onGet'
        },

        initialize: function() {
            this.collections = {};

            // Initialize local settings collections
            this.collections.local = new LocalSettingsCollection();

            // Initialize remote settings collections
            this.collections.remote = new RemoteSettingsCollection();

            this.listenTo(this.collections.local, 'reset', this.onLocalSettingsReset, this);
            this.listenTo(this.collections.remote, 'reset', this.onRemoteSettingsReset, this);

            this.listenTo(this.collections.local, 'change', this.onLocalSettingsChange, this);

            this.collections.local.fetch({ reset: true });

            return this;
        },

        onLocalSettingsReset: function() {
            this.collections.remote.fetch({ reset: true });

            return true;
        },

        onRemoteSettingsReset: function() {
            // Remove any relations to old collection and copy remote settings collection
            // to the local settings collection
            this.collections.remote.toJSON().forEach(function(model) {
                // Add each model to trigger events about changes
                this.collections.local.add(model, { merge: true });
            }, this);

            // Save local settings collection to the local storage
            this.collections.local.save();

            this.announce('ready');

            return true;
        },

        onLocalSettingsChange: function(model) {
            this.announce('changed:' + model.id);

            this.announce('changed', model);

            return true;
        },

        onGet: function(key, callback, context) {
            callback.apply(context, [this.get(key)]);

            return true;
        },

        get: function(key) {
            return this.model.get(key);
        }

    });

    return Settings;
});
