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

        // Reference to the categories collection
        categories: null,

        active_category_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
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

            this.categories.forEach(function(category_model) {
                var view = new CategoryView({
                    parent: this,
                    model:  category_model
                });

                if (this.active_category_id === category_model.id) {
                    view.setIsActive(true);
                }

                this.$('.nav').append(view.render().$el);

                this.views[category_model.id] = view;
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
