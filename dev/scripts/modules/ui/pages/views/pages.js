/*global define*/

define([
    'backbone',
    'hbs!../templates/pages',
    './brand-item',
    './item',
    './engines-item'
], function (Backbone, PagesTemplate, BrandItemView, ItemView, EnginesItemView) {
    'use strict';

    var PagesView = Backbone.View.extend({

        template: PagesTemplate,

        className: 'navbar-inner',

        // Reference to the engines collection
        collection: null,

        active_item_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setActiveItemById: function(item_id) {
            this.active_item_id = item_id;

            return true;
        },

        render: function() {
            this.clearViews();

            this.$el.html(this.template());

            this.renderBrandItemView();

            this.collection.forEach(function(model) {
                var view = new ItemView({
                    parent: this,
                    model:  model
                });

                if (this.active_item_id === model.id) {
                    view.setIsActive(true);
                }

                this.$('.nav').append(view.render().$el);

                this.views[model.id] = view;
            }, this);

            this.renderEnginesItemView();

            return this;
        },

        renderBrandItemView: function() {
            var view = new BrandItemView({
                parent: this,
                model:  this.collection.at(0)
            });

            this.views.brand = view;

            this.$('.container-fluid').prepend(view.render().$el);

            return true;
        },

        renderEnginesItemView: function() {
            var view = new EnginesItemView({
                parent: this
            });

            if (this.active_item_id === 'engines') {
                view.setIsActive(true);
            }

            this.$('.nav').append(view.render().$el);

            this.views.engines = view;

            return true;
        },

        clearViews: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
                delete this.views[key];
            }, this);

            return true;
        }

    });

    return PagesView;
});
