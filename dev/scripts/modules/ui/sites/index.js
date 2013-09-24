/*global define*/

define([
    'backbone',
    './views/sites'
], function (Backbone, SitesView) {
    'use strict';

    var Sites = Backbone.UIController.extend({

        namespace: 'ui:sites',

        listeners: {
            ':open':                'onOpen',
            'data:sites:ready':     'onDataSitesReady',
            'data:groups:ready':    'onDataGroupsReady',
            'ui:window:resized':    'onWindowResized',
            'ui:page:open':         'remove',
            'ui:iframe:open':       'remove',
            'ui:engines:open':      'remove',
            'ui:site:open':         'remove'
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

            this.views.sites = new SitesView();

            return this;
        },

        onOpen: function() {
            this.remove();

            this.request('data:state:get', 'group-id', this.onDataStateGetGroupId, this);

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

            this.views.sites.setSites(this.sites);

            return true;
        },

        onDataGroupsReady: function() {
            this.request('data:groups:get', this.onDataGroupsGet, this);

            return true;
        },

        onDataGroupsGet: function(groups) {
            this.groups = groups;

            this.views.sites.setGroups(this.groups);

            return true;
        },

        onDataStateGetGroupId: function(group_id) {
            this.group = this.groups.get(group_id);

            this.views.sites.setActiveGroup(this.group);

            if (this.group) {
                this.request('ui:routes:set', 'sites/' + this.group.get('slug'));

                this.request('ui:head:set', {
                    title:          this.group.get('name') + ' - File Sharing Directory - TorrentScan',
                    description:    this.group.get('description')
                });
            } else {
                this.request('ui:routes:set', 'sites');

                this.request('ui:head:set', {
                    title:          'File Sharing Directory - TorrentScan',
                    description:    'All file sharing sites.'
                });
            }

            this.render();

            this.request('service:analytics:event', 'sites', 'open', this.group ? this.group.get('name') : '');

            return true;
        },

        onWindowResized: function() {
            if (!this.views.sites) return false;

            this.views.sites.resize();

            return true;
        },

        render: function() {
            this.listenTo(this.views.sites, 'open-site-by-id', this.openSiteById, this);

            this.listenTo(this.views.sites, 'open-by-group-id', this.openByGroupId, this);

            this.views.sites.render();

            this.el.append(this.views.sites.$el);

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

        openSiteById: function(site_id) {
            var site;

            site = this.sites.get(site_id);

            if (!site) return false;

            this.request('data:state:set', 'site-id', site.id);

            this.request('ui:site:open');

            return true;
        },

        openByGroupId: function(group_id) {
            this.request('data:state:set', 'group-id', group_id);

            this.request('ui:sites:open');

            return true;
        }

    });

    return Sites;
});
