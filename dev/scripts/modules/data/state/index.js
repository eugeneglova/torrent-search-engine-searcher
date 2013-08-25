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
            ':set:query':       'onSetQuery',
            ':set:engine-id':   'onSetEngineId',
            ':submit':          'onSubmit',
            ':get:query':       'onGetQuery',
            ':get:engine-id':   'onGetEngineId'
        },

        initialize: function() {
            // Initialize search model
            this.model = new StateModel();

            return this;
        },

        set: function(key, value) {
            this.model.set(key, value);

            this.announce('changed:' + key);

            return true;
        },

        get: function(key) {
            return this.model.get(key);
        },

        onGet: function(key, callback, context) {
            callback.apply(context, [this.get(key)]);

            return true;
        },

        onSetQuery: function(query) {
            this.set('query', query);

            return true;
        },

        onSetEngineId: function(engine_id) {
            this.set('engine-id', engine_id);

            return true;
        },

        onSubmit: function() {
            if (this.isValidSubmit()) {
                this.announce('request:submit');

                return false;
            }

            if (!this.isValidEngineId()) return false;

            this.announce('request:open');

            return true;
        },

        onGetQuery: function(callback, context) {
            return this.onGet('query', callback, context);
        },

        onGetEngineId: function(callback, context) {
            return this.onGet('engine-id', callback, context);
        },

        isValidSubmit: function() {
            if (!this.model.get('query')) return false;

            if (!this.model.get('engine-id')) return false;

            return true;
        },

        isValidEngineId: function() {
            if (!this.model.get('engine-id')) return false;

            return true;
        }

    });

    return State;
});
