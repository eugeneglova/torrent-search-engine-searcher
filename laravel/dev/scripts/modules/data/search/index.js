/*global define*/

define([
    'backbone',
    './models/search'
], function (Backbone, SearchModel) {
    'use strict';

    var Search = Backbone.Controller.extend({

        namespace: 'data:search',

        // Reference to the search model
        model: null,

        listeners: {
            ':set:query':       'onSetQuery',
            ':set:engine-id':   'onSetEngineId'
        },

        initialize: function() {
            // Initialize search model
            this.model = new SearchModel();

            return this;
        },

        set: function(key, value) {
            this.model.set(key, value);

            this.announce('changed:' + key);

            this.submit();

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

        isValid: function() {
            if (!this.model.get('query')) return false;

            if (!this.model.get('engine-id')) return false;

            return true;
        },

        submit: function() {
            if (!this.isValid()) return false;

            this.announce('submit');

            return true;
        }

    });

    return Search;
});
