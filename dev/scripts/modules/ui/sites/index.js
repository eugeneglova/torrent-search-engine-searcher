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
            'ui:window:resized':    'onWindowResized',
            'ui:page:open':         'remove',
            'ui:iframe:open':       'remove',
            'ui:engines:open':      'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        active_group: null,

        // Reference to the sites collection
        sites: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.sites = new SitesView();

            return this;
        },

        onOpen: function() {
            // this.request('data:sites:get', this.onDataSitesGet, this);
            this.request('data:groups:get', this.onDataGroupsGet, this);

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataSitesGet: function(sites) {
            this.sites = sites;

            this.views.sites.setSites(this.sites);

            this.request('data:groups:get', this.onDataGroupsGet, this);

            return true;
        },

        onDataGroupsGet: function(groups) {
            this.groups = groups;

            this.views.sites.setGroups(this.groups);

            this.request('data:state:get', 'group-id', this.onDataStateGetGroupId, this);

            return true;
        },

        onDataStateGetGroupId: function(group_id) {
            var group = this.groups.get(group_id);

            this.views.sites.setActiveGroup(group);

            if (group) {
                this.request('ui:routes:set', 'sites/' + group.get('slug'));

                this.request('ui:head:set', {
                    head_title:         group.get('name') + ' search sites - TorrentScan',
                    head_description:   group.get('description')
                });
            } else {
                this.request('ui:routes:set', 'sites');

                this.request('ui:head:set', {
                    head_title:         'All Avaialble BitTorrent Search Sites - TorrentScan',
                    head_description:   'Huge amount of BitTorrent search sites in one place. You can search torrents with all these torrent search sites.'
                });
            }

            this.render();

            this.request('service:analytics:event', 'sites', 'open', group ? group.get('name') : '');

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
            this.request('data:state:set', 'site-id', site_id);

            this.request('ui:iframe:open');

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
