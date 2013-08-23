/*global define*/

define([
    'backbone',
    'hbs!../templates/engine'
], function (Backbone, EngineTemplate) {
    'use strict';

    var EngineView = Backbone.View.extend({

        template: EngineTemplate,

        tagName: 'li',

        className: 'btn btn-mini btn-block',

        events: {
            'click': 'onClick'
        },

        selected_class: 'btn-primary',

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        addSelectedClass: function() {
            this.$el.addClass(this.selected_class);

            return true;
        },

        onClick: function(e) {
            e.preventDefault();

            this.model.trigger('set-engine-id', this.model.id);

            return true;
        }

    });

    return EngineView;
});
