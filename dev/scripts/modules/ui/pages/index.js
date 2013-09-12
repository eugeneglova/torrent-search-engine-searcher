/*global define*/

define([
    'backbone',
    './views/pages'
], function (Backbone, PagesView) {
    'use strict';

    var Pages = Backbone.UIController.extend({

        namespace: 'ui:pages',

        listeners: {
            'data:pages:ready': 'onDataPagesReady',
            'ui:page:open':     'onPageOpen',
            'ui:iframe:open':   'onIframeOpen',
            'ui:engines:open':  'onEnginesOpen'
        },

        el: null,

        views: null,

        // Reference to the pages collection
        pages: null,

        initialize: function() {
            this.el = $('.navigation-top');

            this.views = {};

            return this;
        },

        onDataPagesReady: function() {
            this.request('data:pages:get', this.onDataPagesGet, this);

            return true;
        },

        onDataPagesGet: function(pages) {
            this.pages = pages;

            this.views.pages = new PagesView({
                collection: this.pages
            });

            this.listenTo(this.views.pages, 'open-page-by-id', this.openPageById, this);

            this.listenTo(this.views.pages, 'open-engines', this.openEngines, this);

            this.render();

            this.request('ui:window:resize');

            this.announce('ready');

            return true;
        },

        onPageOpen: function() {
            this.request('data:state:get', 'page-id', this.onGetPageId, this);

            return true;
        },

        onGetPageId: function(page_id) {
            this.views.pages.setActiveItemById(page_id);

            this.render();

            return true;
        },

        onIframeOpen: function() {
            this.views.pages.setActiveItemById(null);

            this.render();

            return true;
        },

        onEnginesOpen: function() {
            this.views.pages.setActiveItemById('engines');

            this.render();

            return true;
        },

        render: function() {
            this.views.pages.render();

            this.el.prepend(this.views.pages.$el);

            return this;
        },

        openPageById: function(page_id) {
            this.request('data:state:set', 'page-id', page_id);

            this.request('ui:page:open');

            return true;
        },

        openEngines: function() {
            this.request('ui:engines:open');

            return true;
        }

    });

    return Pages;
});
