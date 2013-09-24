/*global define*/

define([
    'backbone',
    './views/site'
], function (Backbone, SiteView) {
    'use strict';

    var Site = Backbone.UIController.extend({

        namespace: 'ui:site',

        listeners: {
            ':open':                'onOpen',
            'data:sites:ready':     'onDataSitesReady',
            'data:groups:ready':    'onDataGroupsReady',
            'ui:window:resized':    'onWindowResized',
            'ui:page:open':         'remove',
            'ui:iframe:open':       'remove',
            'ui:engines:open':      'remove',
            'ui:sites:open':        'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        site: null,

        group: null,

        // Reference to the sites collection
        sites: null,

        // Reference to the groups collection
        groups: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.site = new SiteView();

            return this;
        },

        onOpen: function() {
            this.remove();

            this.request('data:state:get', 'site-id', this.onDataStateGetSiteId, this);

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataSitesReady: function() {
            this.request('data:sites:get', this.onDataSitesGet, this);

            return true;
        },

        onDataSitesGet: function(sites) {
            this.sites = sites;

            return true;
        },

        onDataGroupsReady: function() {
            this.request('data:groups:get', this.onDataGroupsGet, this);

            return true;
        },

        onDataGroupsGet: function(groups) {
            this.groups = groups;

            return true;
        },

        onDataStateGetSiteId: function(site_id) {
            this.site = this.sites.get(site_id);

            if (!this.site) return false;

            this.views.site.setSite(this.site);

            this.group = this.groups.findWhere({ id: this.site.get('site_group_id') });

            if (!this.group) return false;

            this.views.site.setGroup(this.group);

            this.request('ui:routes:set', 'sites/' + this.group.get('slug') + '/' + this.site.get('slug'));

            this.site.fetch().then(this.onSiteLoad.bind(this));

            this.request('service:analytics:event', 'site', 'open', this.site.get('name'));

            return true;
        },

        onSiteLoad: function() {
            this.request('ui:head:set', {
                title:          this.site.get('name') + ' - ' + this.group.get('name') + ' File Sharing Directory - TorrentScan',
                description:    this.site.get('description')
            });

            this.render();

            return true;
        },

        onWindowResized: function() {
            if (!this.views.site) return false;

            this.views.site.resize();

            return true;
        },

        render: function() {
            this.views.site.render();

            this.el.append(this.views.site.$el);

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
        }

    });

    return Site;
});
