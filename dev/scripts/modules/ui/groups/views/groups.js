/*global define*/

define([
    'backbone',
    './item',
    './engines-item',
    './dropdown'
], function (Backbone, ItemView, EnginesItemView, DropdownView) {
    'use strict';

    var GroupsView = Backbone.View.extend({

        tagName: 'ul',

        className: 'groups nav',

        // Reference to the groups collection
        groups: null,

        // Limit number of inline groups rest will be output as dropdown
        limit: 4,

        active_item_id: null,

        views: null,

        initialize: function(options) {
            this.groups = options.groups;

            this.views = {};

            return this;
        },

        setActiveItemById: function(item_id) {
            this.active_item_id = item_id;

            return true;
        },

        render: function() {
            this.clearViews();

            this.renderEnginesItemView();

            this.groups.forEach(function(model, index) {
                if (index >= this.limit) return false;

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

            this.views.rest = new DropdownView({
                parent: this,
                groups: this.groups.rest(this.limit)
            });

            this.$el.append(this.views.rest.render().$el);

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

    return GroupsView;
});
