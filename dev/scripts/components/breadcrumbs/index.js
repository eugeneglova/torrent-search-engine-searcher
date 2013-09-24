/*global define*/

define([
    'backbone',
    './views/breadcrumbs'
], function (Backbone, BreadcrumbsView) {
    'use strict';

    var Site = Backbone.UIController.extend({

        namespace: 'ui:breadcrumbs',

        el: null,

        views: null,

        is_rendered: null,

        // Reference to the breadcrumbs collection
        breadcrumbs: null,

        initialize: function(options) {
            this.views = {};

            this.breadcrumbs = options.collection;

            this.views.breadcrumbs = new BreadcrumbsView({
                collection: this.breadcrumbs
            });

            return this;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        render: function() {
            this.listenTo(this.views.breadcrumbs, 'open-route', this.onOpenRoute, this);

            this.views.breadcrumbs.render();

            this.el = this.views.breadcrumbs.$el;

            this.is_rendered = true;

            return this;
        },

        remove: function() {
            if (!this.isRendered()) return false;

            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            return true;
        },

        onOpenRoute: function(route) {
            this.request('ui:routes:set', route, { trigger: true });

            return true;
        }

    });

    return Site;
});
