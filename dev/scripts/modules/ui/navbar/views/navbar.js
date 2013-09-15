/*global define*/

define([
    'backbone',
    'hbs!../templates/navbar'
], function (Backbone, NavbarTemplate) {
    'use strict';

    var NavbarView = Backbone.View.extend({

        template: NavbarTemplate,

        className: 'navbar-inner',

        events: {
            'click .brand': 'onClickBrand'
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        onClickBrand: function(e) {
            e.preventDefault();

            this.trigger('open-home-page');

            return true;
        }

    });

    return NavbarView;
});
