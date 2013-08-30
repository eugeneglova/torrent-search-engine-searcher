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
            var model, route;

            model = this.pages.get(page_id);

            this.views.page.setModel(model);

            if (model.get('is_home_page')) {
                route = '';
            } else {
                route = 'page/' + model.get('slug');
            }

            this.request('ui:routes:set', route);

            this.request('ui:head:set', model.toJSON());

            this.request('service:analytics:event', 'page', 'open', model.get('name'));

            model.fetch().then(this.render.bind(this));

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
