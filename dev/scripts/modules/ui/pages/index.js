/*global define*/

define([
    'underscore',
    'backbone',
    './views/pages'
], function (_, Backbone, PagesView) {
    'use strict';

    var Pages = Backbone.UIController.extend({

        namespace: 'ui:pages',

        listeners: {
            ':home':            'onHome',
            'data:pages:ready': 'onDataPagesReady',
            'ui:page:open':     'onPageOpen',
            'ui:iframe:open':   'onIframeOpen',
            'ui:engines:open':  'onEnginesOpen',
            'ui:sites:open':    'onSitesOpen',
            'ui:site:open':     'onSitesOpen'
        },

        el: null,

        views: null,

        // Reference to the pages collection
        pages: null,

        initialize: function() {
            _.defer(function() {
                this.el = $('.nav-collapse');
            }.bind(this));

            this.views = {};

            return this;
        },

        onHome: function() {
            var page;

            if (!this.pages || !this.pages.length) return false;

            page = this.pages.at(0);

            if (!page) return false;

            this.openPageById(page.id);

            return true;
        },

        onDataPagesReady: function() {
            this.request('data:pages:get', this.onDataPagesGet, this);

            return true;
        },

        onDataPagesGet: function(pages) {
            this.pages = pages;

            this.views.pages = new PagesView({
                pages: this.pages
            });

            this.listenTo(this.views.pages, 'open-page-by-id', this.openPageById, this);

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
            this.views.pages.setActiveItemByRoute('engines');

            this.render();

            return true;
        },

        onSitesOpen: function() {
            this.views.pages.setActiveItemByRoute('sites');

            this.render();

            return true;
        },

        render: function() {
            this.views.pages.render();

            this.el.prepend(this.views.pages.$el);

            return this;
        },

        openPageById: function(page_id) {
            var page = this.pages.get(page_id);

            if (!page) return false;

            if (page.get('is_custom')) {
                this.request('ui:routes:set', page.get('route'), { trigger: true });
            } else {
                this.request('data:state:set', 'page-id', page_id);

                this.request('ui:page:open');
            }

            return true;
        }

    });

    return Pages;
});
