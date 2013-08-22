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

            return true;
        },

        onSetQuery: function(query) {
            this.set('query', query);

            return true;
        },

        onSetEngineId: function(engine_id) {
            this.set('engine-id', engine_id);

            return true;
        }

    });

    return Search;
});
