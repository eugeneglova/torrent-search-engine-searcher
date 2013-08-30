/*global define*/

define([
    'backbone',
    './views/iframe'
], function (Backbone, IframeView) {
    'use strict';

    var Iframe = Backbone.UIController.extend({

        namespace: 'ui:iframe',

        listeners: {
            ':open':                'onOpen',
            'data:engines:ready':   'onDataEnginesReady',
            'ui:page:open':         'remove'
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
            this.request('data:state:get:engine-id', this.onGetEngineId, this);

            return true;
        },

        onGetEngineId: function(engine_id) {
            this.views.iframe.setModel(this.engines.get(engine_id));

            this.request('data:state:get:type', this.onGetType, this);

            return true;
        },

        onGetType: function(type) {
            this.views.iframe.setType(type);

            if (type === 'home') {
                this.render();

                this.request('ui:routes:set', 'engine/' + this.views.iframe.model.get('slug'));

                this.request('service:analytics:event', 'iframe', type, this.views.iframe.model.get('name_stripped'));
            } else if (type === 'search') {
                this.request('data:state:get:query', this.onGetQuery, this);
            }

            return true;
        },

        onGetQuery: function(query) {
            this.views.iframe.setQuery(query);

            this.render();

            this.request('service:analytics:event', 'iframe', this.views.iframe.type, this.views.iframe.model.get('name_stripped'));

            this.request('service:analytics:event', 'iframe', 'query', query);

            return true;
        },

        render: function() {
            this.views.iframe.render();

            this.el.append(this.views.iframe.$el);

            return this;
        },

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            return true;
        }

    });

    return Iframe;
});
