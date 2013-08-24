/*global define*/

define([
    'backbone',
    './views/iframe'
], function (Backbone, IframeView) {
    'use strict';

    var Iframe = Backbone.UIController.extend({

        namespace: 'ui:iframe',

        listeners: {
            'data:engines:ready':           'onDataEnginesReady',
            'data:search:request:open':     'onOpen',
            'data:search:request:submit':   'onSubmit'
        },

        el: null,

        views: null,

        // Reference to the engines collection
        engines: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.iframe = new IframeView();

            return this;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            return true;
        },

        onOpen: function() {
            this.request('data:search:get:engine-id', this.openByEngineId, this);

            return true;
        },

        onSubmit: function() {
            this.request('data:search:get:engine-id', this.submitByEngineId, this);

            return true;
        },

        openByEngineId: function(engine_id) {
            this.views.iframe.setModel(this.engines.get(engine_id));
            this.views.iframe.setType('open');

            this.render();

            return true;
        },

        submitByEngineId: function(engine_id) {
            this.views.iframe.setModel(this.engines.get(engine_id));
            this.views.iframe.setType('submit');

            this.request('data:search:get:query', this.submitByQuery, this);

            return true;
        },

        submitByQuery: function(query) {
            this.views.iframe.setQuery(query);

            this.render();

            return true;
        },

        render: function() {
            this.views.iframe.render();

            this.el.append(this.views.iframe.$el);

            return this;
        }

    });

    return Iframe;
});
