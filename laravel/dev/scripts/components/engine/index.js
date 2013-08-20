/*global define*/

define([
    'jquery',
    'backbone',
    'hbs!./templates/engine'
], function ($, Backbone, EngineTemplate) {
    'use strict';

    var EngineView = Backbone.UIModule.extend({

        template: EngineTemplate,

        tagName: 'li',

        className: 'btn btn-mini btn-block',

        namespace: 'ui:engine',

        listeners: {
            'ui:engines:primary': 'onUiEnginesPrimary'
        },

        events: {
            'click': 'onClick'
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        onUiEnginesPrimary: function(id) {
            this.$el.removeClass('btn-primary');

            if (this.model.id === id) {
                this.$el.addClass('btn-primary');
            }

            return true;
        },

        onClick: function(e) {
            e.preventDefault();

            return true;
        }

    });

    return EngineView;
});
