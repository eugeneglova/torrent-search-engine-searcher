/*global define*/

define([
    'backbone',
    './views/navbar'
], function (Backbone, NavbarView) {
    'use strict';

    var Navbar = Backbone.UIController.extend({

        namespace: 'ui:navbar',

        el: null,

        views: null,

        initialize: function() {
            this.el = $('.navigation-top');

            this.views = {};

            this.views.navbar = new NavbarView();

            this.listenTo(this.views.navbar, 'open-home-page', this.onOpenHomePage, this);

            this.render();

            this.request('ui:window:resize');

            this.announce('ready');

            return this;
        },

        render: function() {
            this.views.navbar.render();

            this.el.prepend(this.views.navbar.$el);

            return this;
        },

        onOpenHomePage: function() {
            this.request('ui:pages:home');

            return true;
        }

    });

    return Navbar;
});
