/*global define*/

define([
    'jquery',
    'backbone',
    'hbs!../templates/category'
], function ($, Backbone, CategoryTemplate) {
    'use strict';

    var CategoryView = Backbone.View.extend({

        template: CategoryTemplate,

        tagName: 'li',

        events: {
            'click': 'onClick'
        },

        // Reference to parent view
        parent: null,

        // Reference to engine model
        engine: null,

        // Reference to category model
        category: null,

        is_active: null,

        active_class: 'active',

        initialize: function(options) {
            this.parent = options.parent;

            this.engine = options.engine;

            this.category = options.category;

            this.setIsActive(false);

            return this;
        },

        render: function() {
            this.$el.html(this.template({
                engine:     this.engine.toJSON(),
                category:   this.category.toJSON()
            }));

            return this;
        },

        setIsActive: function(is_active) {
            this.is_active = is_active;

            if (this.isActive()) {
                this.$el.addClass(this.active_class);
            }

            return true;
        },

        isActive: function() {
            return !!this.is_active;
        },

        onClick: function(e) {
            var category_id;

            e.preventDefault();

            category_id = $(e.currentTarget).hasClass(this.active_class) ? undefined : this.category.id;

            this.parent.trigger('open-category-by-id', category_id);

            return true;
        }

    });

    return CategoryView;
});
