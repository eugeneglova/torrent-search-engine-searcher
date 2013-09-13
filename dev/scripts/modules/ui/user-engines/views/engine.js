/*global define*/

define([
    'backbone',
    'hbs!../templates/engine'
], function (Backbone, EngineTemplate) {
    'use strict';

    var EngineView = Backbone.View.extend({

        template: EngineTemplate,

        tagName: 'li',

        className: 'user-engine',

        events: {
            'click':    'onClick',
            'drop':     'onDrop'
        },

        // Reference to parent view
        parent: null,

        is_active: null,

        active_class: 'active',

        initialize: function(options) {
            this.parent = options.parent;

            this.is_active = false;

            return this;
        },

        render: function() {
            this.$el.attr('data-id', this.model.id);

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        toggleActiveClass: function(is_active) {
            this.is_active = is_active;

            this.$el.toggleClass(this.active_class, this.isActive());

            return true;
        },

        isActive: function() {
            return !!this.is_active;
        },

        onClick: function(e) {
            e.preventDefault();

            if ($(e.currentTarget).hasClass('ui-sortable-helper')) return false;

            this.parent.trigger('open-engine-by-id', this.model.id);

            return true;
        },

        onDrop: function() {
            this.parent.trigger('remove-engine-by-id', this.model.id);

            return true;
        }

    });

    return EngineView;
});
