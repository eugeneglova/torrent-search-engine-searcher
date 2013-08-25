/*global define*/

define([
    'backbone',
    './views/navbar'
], function (Backbone, NavbarView) {
    'use strict';

    var Navbar = Backbone.UIController.extend({

        namespace: 'ui:navbar',

        listeners: {
            'data:pages:ready': 'onDataPagesReady'
        },

        el: null,

        views: null,

        // Reference to the pages collection
        pages: null,

        initialize: function() {
            this.el = $('.main-container');

            this.views = {};

            this.views.navbar = new NavbarView();

            return this;
        },

        onDataPagesReady: function() {
            this.request('data:pages:get', this.onDataPagesGet, this);

            return true;
        },

        onDataPagesGet: function(pages) {
            this.pages = pages;

            this.render();

            this.announce('ready');

            return true;
        },

        render: function() {
            this.views.navbar.render();

            this.el.prepend(this.views.navbar.$el);

            return this;
        }

    });

    return Navbar;
});