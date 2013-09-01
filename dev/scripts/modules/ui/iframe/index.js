/*global define*/

define([
    'backbone',
    './views/iframe'
], function (Backbone, IframeView) {
    'use strict';

    var Iframe = Backbone.UIController.extend({

        namespace: 'ui:iframe',

        listeners: {
            ':open':                    'onOpen',
            'data:engines:ready':       'onDataEnginesReady',
            'ui:page:open':             'remove'
        },

        el: null,

        views: null,

        // Reference to the engines collection
        engines: null,

        // Reference to the categories collection
        categories: null,

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
            this.views.iframe.setEngine(this.engines.get(engine_id));

            this.request('data:state:get:type', this.onGetType, this);

            return true;
        },

        onGetType: function(type) {
            this.views.iframe.setType(type);

            if (type === 'home') {
                this.render();

                this.request('ui:routes:set', 'engine/' + this.views.iframe.engine.get('slug'));

                this.request('ui:head:set', this.views.iframe.engine.toJSON());

                this.request('service:analytics:event', 'iframe', type, this.views.iframe.engine.get('name_stripped'));
            } else if (type === 'search') {
                this.request('data:state:get:query', this.onGetQuery, this);
            }

            return true;
        },

        onGetQuery: function(query) {
            this.views.iframe.setQuery(query);

            this.request('data:categories:get', this.onDataCategoriesGet, this);

            return true;
        },

        onDataCategoriesGet: function(categories) {
            this.categories = categories;

            this.request('data:state:get:category-id', this.onGetCategoryId, this);

            return true;
        },

        onGetCategoryId: function(category_id) {
            this.views.iframe.setCategory(this.categories.get(category_id));

            this.render();

            this.request('service:analytics:event', 'iframe', this.views.iframe.type, this.views.iframe.engine.get('name_stripped'));

            this.request('service:analytics:event', 'iframe', 'query', this.views.iframe.query);

            if (this.views.iframe.category) {
                this.request('service:analytics:event', 'iframe', 'category', this.views.iframe.category.get('name_stripped'));
            }

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
