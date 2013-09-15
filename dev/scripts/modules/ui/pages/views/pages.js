/*global define*/

define([
    'backbone',
    './item',
    './engines-item'
], function (Backbone, ItemView, EnginesItemView) {
    'use strict';

    var PagesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'pages nav',

        // Reference to the pages collection
        pages: null,

        active_item_id: null,

        views: null,

        initialize: function(options) {
            this.pages = options.pages;

            this.views = {};

            return this;
        },

        setActiveItemById: function(item_id) {
            this.active_item_id = item_id;

            return true;
        },

        render: function() {
            this.clearViews();

            this.pages.forEach(function(model) {
                var view = new ItemView({
                    parent: this,
                    model:  model
                });

                if (this.active_item_id === model.id) {
                    view.setIsActive(true);
                }

                this.$el.append(view.render().$el);

                this.views[model.id] = view;
            }, this);

            this.renderEnginesItemView();

            return this;
        },

        renderEnginesItemView: function() {
            var view = new EnginesItemView({
                parent: this
            });

            if (this.active_item_id === 'engines') {
                view.setIsActive(true);
            }

            this.$el.append(view.render().$el);

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
