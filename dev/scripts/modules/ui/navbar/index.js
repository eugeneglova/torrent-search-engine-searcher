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

            this.listenTo(this.views.navbar, 'set-active-item-id', this.onSetActiveItemId, this);

            this.render();

            this.announce('ready');

            return true;
        },

        onIframeOpen: function() {
            this.views.navbar.setActiveItemId();

            this.render();

            return true;
        },

        render: function() {
            this.views.navbar.render();

            this.el.prepend(this.views.navbar.$el);

            return this;
        },

        onSetActiveItemId: function(item_id) {
            this.request('data:state:set:page-id', item_id);

            this.request('ui:page:open');

            this.views.navbar.setActiveItemId(item_id);

            this.render();

            return true;
        }

    });

    return Navbar;
});
