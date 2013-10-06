/*global define*/

define([
    'backbone',
    './views/page'
], function (Backbone, PageView) {
    'use strict';

    var Page = Backbone.UIController.extend({

        namespace: 'ui:page',

        listeners: {
            ':open':                'onOpen',
            'data:pages:ready':     'onDataPagesReady',
            'ui:window:resized':    'onWindowResized',
            'ui:iframe:open':       'remove',
            'ui:engines:open':      'remove',
            'ui:sites:open':        'remove',
            'ui:site:open':         'remove'
        },

        el: null,

        views: null,

        // Reference to the pages collection
        pages: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.page = new PageView();

            this.listenTo(this.views.page, 'submit-contact-page', this.onSubmitContactPage, this);

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
            this.request('data:state:get', 'page-id', this.onGetPageId, this);

            return true;
        },

        onGetPageId: function(page_id) {
            var route;

            this.page = this.pages.get(page_id);

            this.views.page.setModel(this.page);

            if (this.page.get('is_home_page')) {
                route = '';
            } else {
                route = 'page/' + this.page.get('slug');
            }

            this.request('ui:routes:set', route);

            this.page.fetch().then(this.onPageLoad.bind(this));

            this.request('service:analytics:event', 'page', 'open', this.page.get('name'));

            return true;
        },

        onPageLoad: function() {
            this.request('ui:head:set', {
                title:          this.page.get('head_title'),
                description:    this.page.get('head_description')
            });

            this.render();

            return true;
        },

        onSubmitContactPage: function(fields) {
            this.request('service:contact:send', fields, this.onServiceContactSend, this);

            this.request('service:analytics:event', 'page', 'submit', 'contact');

            return true;
        },

        onServiceContactSend: function() {
            this.views.page.model.set({
                title:      'Thank you',
                content:    'Your message has been sent.'
            });

            this.remove();

            this.render();

            return true;
        },

        onWindowResized: function() {
            if (!this.views.page) return false;

            this.views.page.resize();

            return true;
        },

        render: function() {
            this.views.page.render();

            this.el.append(this.views.page.$el);

            if (this.page.get('is_home_page')) {
                this.announce('opened:home');
            }

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
