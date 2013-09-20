/*global define*/

define([
    'backbone',
    'hbs!../templates/site'
], function (Backbone, SiteTemplate) {
    'use strict';

    var SiteView = Backbone.View.extend({

        template: SiteTemplate,

        tagName: 'li',

        className: 'site',

        events: {
            'click': 'onClick'
        },

        // Reference to parent view
        parent: null,

        is_active: null,

        active_class: 'active',

        initialize: function(options) {
            this.parent = options.parent;

            this.setIsActive(false);

            this.$el.attr('data-id', this.model.id);

            return this;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

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
            e.preventDefault();

            this.parent.trigger('open-site-by-id', this.model.id);

            return true;
        }

    });

    return SiteView;
});
