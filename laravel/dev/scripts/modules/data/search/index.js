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
            ':set:engine-id':   'onSetEngineId',
            ':submit':          'onSubmit'
        },

        initialize: function() {
            // Initialize search model
            this.model = new SearchModel();

            return this;
        },

        set: function(key, value) {
            this.model.set(key, value);

            this.announce('changed:' + key);

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

    return Search;
});
