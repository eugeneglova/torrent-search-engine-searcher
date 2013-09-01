/*global define*/

define([
    'backbone',
    './category',
    'hbs!../templates/categories'
], function (Backbone, CategoryView, CategoriesTemplate) {
    'use strict';

    var CategoriesView = Backbone.View.extend({

        template: CategoriesTemplate,

        className: 'navbar-inner',

        // Reference to the engine model
        engine: null,

        // Reference to the categories collection
        categories: null,

        active_category_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setEngine: function(engine) {
            this.engine = engine;

            return true;
        },

        setCategories: function(categories) {
            this.categories = categories;

            return true;
        },

        setActiveItemById: function(category_id) {
            this.active_category_id = category_id;

            return true;
        },

        render: function() {
            this.clearViews();

            this.$el.html(this.template());

            this.categories.forEach(function(model) {
                var view = new CategoryView({
                    parent:     this,
                    engine:     this.engine,
                    category:   model
                });

                if (this.active_category_id === model.id) {
                    view.setIsActive(true);
                }

                this.$('.nav').append(view.render().$el);

                this.views[model.id] = view;
            }, this);

            return this;
        },

        clearViews: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
                delete this.views[key];
            }, this);

            return true;
        }

    });

    return CategoriesView;
});
