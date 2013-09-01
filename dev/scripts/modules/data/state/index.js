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
            ':get:query':       'onGetQuery',
            ':get:engine-id':   'onGetEngineId',
            ':get:category-id': 'onGetCategoryId',
            ':get:type':        'onGetType',
            ':get:page-id':     'onGetPageId',
            ':set:query':       'onSetQuery',
            ':set:engine-id':   'onSetEngineId',
            ':set:category-id': 'onSetCategoryId',
            ':set:page-id':     'onSetPageId'
        },

        initialize: function() {
            // Initialize search model
            this.model = new StateModel();

            this.announce('ready');

            return this;
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
        },

        onGet: function(key, callback, context) {
            callback.apply(context, [this.get(key)]);

            return true;
        },

        onSetQuery: function(query) {
            this.set('query', query);

            this.setType();

            return true;
        },

        onSetEngineId: function(engine_id) {
            this.set('engine-id', engine_id);

            this.setType();

            return true;
        },

        onSetCategoryId: function(category_id) {
            this.set('category-id', category_id);

            this.setType();

            return true;
        },

        onSetPageId: function(page_id) {
            this.set('page-id', page_id);

            return true;
        },

        onGetQuery: function(callback, context) {
            return this.onGet('query', callback, context);
        },

        onGetEngineId: function(callback, context) {
            return this.onGet('engine-id', callback, context);
        },

        onGetCategoryId: function(callback, context) {
            return this.onGet('category-id', callback, context);
        },

        onGetType: function(callback, context) {
            return this.onGet('type', callback, context);
        },

        onGetPageId: function(callback, context) {
            return this.onGet('page-id', callback, context);
        }

    });

    return State;
});
