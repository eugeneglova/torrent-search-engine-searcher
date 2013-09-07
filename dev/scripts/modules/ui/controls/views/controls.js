/*global define*/

define([
    'backbone',
    'hbs!../templates/controls'
], function (Backbone, ControlsTemplate) {
    'use strict';

    var ControlsView = Backbone.View.extend({

        template: ControlsTemplate,

        tagName: 'ul',

        className: 'controls nav nav-pills',

        events: {
            'click a': 'onClick'
        },

        views: null,

        initialize: function() {
            this.views = {};

            this.render();

            return this;
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        onClick: function(e) {
            e.preventDefault();

            this.trigger('open-engines');

            return true;
        }

    });

    return ControlsView;
});
