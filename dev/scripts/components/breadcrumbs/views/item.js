/*global define*/

define([
    'backbone',
    'hbs!../templates/item'
], function (Backbone, ItemTemplate) {
    'use strict';

    var ItemView = Backbone.View.extend({

        template: ItemTemplate,

        tagName: 'li',

        events: {
            'click a': 'onClick'
        },

        // Reference to parent view
        parent: null,

        active_class: 'active',

        initialize: function(options) {
            this.parent = options.parent;

            return this;
        },

        render: function() {
            if (this.model.get('is_active')) {
                this.$el.addClass(this.active_class);
            }

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        onClick: function(e) {
            e.preventDefault();

            this.parent.trigger('open-by-route', this.model.id);

            return true;
        }

    });

    return ItemView;
});
