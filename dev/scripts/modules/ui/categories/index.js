/*global define*/

define([
    'backbone',
    './views/categories'
], function (Backbone, CategoriesView) {
    'use strict';

    var Categories = Backbone.UIController.extend({

        namespace: 'ui:categories',

        listeners: {
            'data:state:changed:engine-id': 'onDataStateChangedEngineId',
            'data:engines:ready':           'onDataEnginesReady',
            'ui:iframe:open':               'onIframeOpen',
            'ui:page:open':                 'remove'
        },

        el: null,

        ui: null,

        views: null,

        // Reference to the engines collection
        engines: null,

        // Reference to the categories collection
        categories: null,

        initialize: function() {
            this.el = $('.navigation-top');

            this.ui = {
                window: $(window)
            };

            this.views = {};

            this.views.categories = new CategoriesView();

            this.listenTo(this.views.categories, 'open-category-by-id', this.openCategoryById, this);

            return this;
        },

        onDataStateChangedEngineId: function() {
            this.request('data:categories:get', this.onDataCategoriesGet, this);

            return true;
        },

        onDataCategoriesGet: function(categories) {
            this.categories = categories;

            this.views.categories.setCategories(this.categories);

            this.views.categories.setEngine(this.engines.get(this.categories.engine_id));

            this.render();

            return true;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            return true;
        },

        onIframeOpen: function() {
            this.request('data:state:get:category-id', this.onGetCategoryId, this);

            return true;
        },

        onGetCategoryId: function(category_id) {
            this.views.categories.setActiveItemById(category_id);

            this.render();

            return true;
        },

        render: function() {
            if (!this.categories || !this.categories.length) {
                this.remove();

                return false;
            }

            this.views.categories.render();

            this.el.append(this.views.categories.$el);

            this.ui.window.trigger('resize');

            return this;
        },

        openCategoryById: function(category_id) {
            this.request('data:state:set:category-id', category_id);

            this.request('ui:iframe:open');

            return true;
        },

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.ui.window.trigger('resize');

            return true;
        }

    });

    return Categories;
});
