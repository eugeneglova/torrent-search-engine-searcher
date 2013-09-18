/*global define*/

define([
    'backbone',
    './views/categories'
], function (Backbone, CategoriesView) {
    'use strict';

    var Categories = Backbone.UIController.extend({

        namespace: 'ui:categories',

        listeners: {
            'data:engines:ready':   'onDataEnginesReady',
            'ui:iframe:opened':     'onIframeOpen',
            'ui:page:open':         'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        // Reference to the engines collection
        engines: null,

        // Reference to the categories collection
        categories: null,

        initialize: function() {
            this.el = $('.navigation-top');

            this.views = {};

            this.views.categories = new CategoriesView();

            this.listenTo(this.views.categories, 'open-category-by-id', this.openCategoryById, this);

            return this;
        },

        isRendered: function() {
            return !!this.is_rendered;
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
            this.request('data:state:get', 'query', this.onGetQuery, this);

            return true;
        },

        onGetQuery: function(query) {
            if (!query || !query.length) {
                this.remove();

                return false;
            }

            this.views.categories.setQuery(query);

            this.request('data:categories:get', this.onDataCategoriesGet, this);

            return true;
        },

        onDataCategoriesGet: function(categories) {
            this.categories = categories;

            this.views.categories.setCategories(this.categories);

            this.views.categories.setEngine(this.engines.get(this.categories.engine_id));

            this.request('data:state:get', 'category-id', this.onGetCategoryId, this);

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

            this.is_rendered = true;

            this.request('ui:window:resize');

            return this;
        },

        openCategoryById: function(category_id) {
            this.request('data:state:set', 'category-id', category_id);

            this.request('ui:iframe:open');

            return true;
        },

        remove: function() {
            if (!this.isRendered()) return false;

            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            this.request('ui:window:resize');

            return true;
        }

    });

    return Categories;
});
