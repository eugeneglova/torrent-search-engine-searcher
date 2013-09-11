/*global define*/

define([
    'backbone',
    './models/state'
], function (Backbone, StateModel) {
    'use strict';

    var State = Backbone.Controller.extend({

        namespace: 'data:state',

        // Reference to the search model
        model: null,

        listeners: {
            ':get': 'onGet',
            ':set': 'onSet'
        },

        initialize: function() {
            // Initialize search model
            this.model = new StateModel();

            this.announce('ready');

            return this;
        },

        onGet: function(key, callback, context) {
            callback.call(context, this.get(key));

            return true;
        },

        onSet: function(key, value) {
            this.set(key, value);

            if (['query', 'engine-id', 'category-id'].indexOf(key) !== -1) {
                this.setType();
            }

            return true;
        },

        get: function(key) {
            return this.model.get(key);
        },

        set: function(key, value) {
            this.model.set(key, value);

            this.announce('changed:' + key);

            return true;
        },

        setType: function() {
            if (this.get('query') && this.get('query').length) {
                this.set('type', 'search');
            } else {
                this.set('type', 'home');
            }

            return true;
        }

    });

    return State;
});
