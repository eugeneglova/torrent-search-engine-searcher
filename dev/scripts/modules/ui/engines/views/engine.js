/*global define*/

define([
    'backbone',
    'hbs!../templates/engine'
], function (Backbone, EngineTemplate) {
    'use strict';

    var EngineView = Backbone.View.extend({

        template: EngineTemplate,

        tagName: 'li',

        events: {
            'click': 'onClick'
        },

        is_active: null,

        active_class: 'active',

        initialize: function() {
            this.setIsActive(false);

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

            this.model.trigger('set-engine-id', this.model.id);

            return true;
        }

    });

    return EngineView;
});
