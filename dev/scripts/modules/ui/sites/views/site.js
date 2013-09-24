/*global define*/

define([
    'underscore',
    'backbone',
    'hbs!../templates/site'
], function (_, Backbone, SiteTemplate) {
    'use strict';

    var SiteView = Backbone.View.extend({

        template: SiteTemplate,

        tagName: 'li',

        className: 'site-item',

        events: {
            'click': 'onClick'
        },

        // Reference to parent view
        parent: null,

        is_active: null,

        class: 'active',

        initialize: function(options) {
            this.parent = options.parent;

            this.groups = options.groups;

            this.group = this.groups.findWhere({ id: this.model.get('site_group_id') }).value();

            this.setIsActive(false);

            this.$el.attr('data-id', this.model.id);

            return this;
        },

        render: function() {
            this.$el.html(this.template(_.extend({}, this.model.toJSON(), {
                group: this.group.toJSON()
            })));

            return this;
        },

        setIsActive: function(is_active) {
            this.is_active = is_active;

            if (this.isActive()) {
                this.$el.addClass(this.class);
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
