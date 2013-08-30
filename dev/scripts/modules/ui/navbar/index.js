/*global define*/

define([
    'backbone',
    './views/navbar'
], function (Backbone, NavbarView) {
    'use strict';

    var Navbar = Backbone.UIController.extend({

        namespace: 'ui:navbar',

        listeners: {
            'data:pages:ready': 'onDataPagesReady',
            'ui:page:open':     'onPageOpen',
            'ui:iframe:open':   'onIframeOpen'
        },

        el: null,

        views: null,

        // Reference to the pages collection
        pages: null,

        initialize: function() {
            this.el = $('.main-container');

            this.views = {};

            return this;
        },

        onDataPagesReady: function() {
            this.request('data:pages:get', this.onDataPagesGet, this);

            return true;
        },

        onDataPagesGet: function(pages) {
            this.pages = pages;

            this.views.navbar = new NavbarView({
                collection: this.pages
            });

            this.listenTo(this.views.navbar, 'open-page-by-id', this.openPageById, this);

            this.render();

            this.announce('ready');

            return true;
        },

        onPageOpen: function() {
            this.request('data:state:get:page-id', this.onGetPageId, this);

            return true;
        },

        onGetPageId: function(page_id) {
            this.views.navbar.setActiveItemId(page_id);

            this.render();

            return true;
        },

        onIframeOpen: function() {
            this.views.navbar.setActiveItemId(null);

            this.render();

            return true;
        },

        render: function() {
            this.views.navbar.render();

            this.el.prepend(this.views.navbar.$el);

            return this;
        },

        openPageById: function(page_id) {
            this.request('data:state:set:page-id', page_id);

            this.request('ui:page:open');

            return true;
        }

    });

    return Navbar;
});
