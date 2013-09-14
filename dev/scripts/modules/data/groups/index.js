/*global define*/

define([
    'backbone',
    './collections/groups'
], function (Backbone, GroupsCollection) {
    'use strict';

    var Groups = Backbone.Controller.extend({

        namespace: 'data:groups',

        listeners: {
            ':get': 'onGet'
        },

        // Reference to the groups collection
        groups: null,

        initialize: function() {
            // Initialize groups collection
            this.groups = new GroupsCollection();

            this.listenTo(this.groups, 'reset', this.onReset, this);

            this.groups.fetch({ reset: true });

            return this;
        },

        onGet: function(callback, context) {
            callback.call(context, this.groups);

            return true;
        },

        onReset: function() {
            this.announce('ready');

            return true;
        }

    });

    return Groups;
});
