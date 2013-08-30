/*global define*/

define([
    'backbone',
    './views/page'
], function (Backbone, PageView) {
    'use strict';

    var Page = Backbone.UIController.extend({

        namespace: 'ui:page',

        listeners: {
            ':open':            'onOpen',
            'data:pages:ready': 'onDataPagesReady',
            'ui:iframe:open':   'remove'
        },

        el: null,

        views: null,

        // Reference to the pages collection
        pages: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.page = new PageView();

            return this;
        },

        onDataPagesReady: function() {
            this.request('data:pages:get', this.onDataPagesGet, this);

            return true;
        },

        onDataPagesGet: function(pages) {
            this.pages = pages;

            this.announce('ready');

            return true;
        },

        onOpen: function() {
            this.request('data:state:get:page-id', this.onGetPageId, this);

            return true;
        },

        onGetPageId: function(page_id) {
            var page_model = this.pages.get(page_id),
                route;

            this.views.page.setModel(page_model);

            if (page_model.get('is_home_page')) {
                route = '';
            } else {
                route = 'page/' + page_model.get('slug');
            }

            this.request('ui:routes:set', route);

            this.request('service:analytics:event', 'page', 'open', page_model.get('name'));

            page_model.fetch().then(this.render.bind(this));

            return true;
        },

        render: function() {
            this.views.page.render();

            this.el.append(this.views.page.$el);

            return this;
        },

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            return true;
        }

    });

    return Page;
});
