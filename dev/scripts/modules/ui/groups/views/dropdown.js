/*global define*/

define([
    'bootstrap',
    './item',
    'hbs!../templates/dropdown'
], function ($, ItemView, DropdownTemplate) {
    'use strict';

    var DropdownView = ItemView.extend({

        template: DropdownTemplate,

        className: 'dropdown',

        // Reference to the groups array
        groups: null,

        views: null,

        initialize: function(options) {
            this.parent = options.parent;

            this.groups = options.groups;

            this.views = {};

            return this;
        },

        render: function() {
            this.$el.html(this.template());

            this.groups.forEach(function(model, index) {
                if (index >= this.limit) return false;

                var view = new ItemView({
                    parent: this.parent,
                    model:  model
                });

                if (this.active_item_id === model.id) {
                    view.setIsActive(true);
                }

                this.$('.dropdown-menu').append(view.render().$el);

                this.views[model.id] = view;
            }, this);

            return this;
        },

        onClick: function(e) {
            e.preventDefault();

            return true;
        }

    });

    return DropdownView;
});
