/*global define*/

define([
    'backbone',
    './views/engines'
], function (Backbone, EnginesView) {
    'use strict';

    var Engines = Backbone.UIController.extend({

        namespace: 'ui:engines',

        listeners: {
            ':open':                'onOpen',
            'ui:window:resized':    'onWindowResized',
            'ui:page:open':         'remove',
            'ui:iframe:open':       'remove',
            'ui:sites:open':        'remove',
            'ui:site:open':         'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        active_group: null,

        // Reference to the engines collection
        engines: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.engines = new EnginesView();

            return this;
        },

        onOpen: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            this.views.engines.setEngines(this.engines);

            this.request('data:groups:get', this.onDataGroupsGet, this);

            return true;
        },

        onDataGroupsGet: function(groups) {
            this.groups = groups;

            this.views.engines.setGroups(this.groups);

            this.request('data:state:get', 'group-id', this.onDataStateGetGroupId, this);

            return true;
        },

        onDataStateGetGroupId: function(group_id) {
            var group = this.groups.get(group_id);

            this.views.engines.setActiveGroup(group);

            if (group) {
                this.request('ui:routes:set', 'engines/' + group.get('slug'));

                this.request('ui:head:set', {
                    head_title:         group.get('name') + ' search engines - TorrentScan',
                    head_description:   group.get('description')
                });
            } else {
                this.request('ui:routes:set', 'engines');

                this.request('ui:head:set', {
                    head_title:         'All Avaialble BitTorrent Search Engines - TorrentScan',
                    head_description:   'Huge amount of BitTorrent search engines in one place. You can search torrents with all these torrent search engines.'
                });
            }

            this.render();

            this.request('service:analytics:event', 'engines', 'open', group ? group.get('name') : '');

            return true;
        },

        onWindowResized: function() {
            if (!this.views.engines) return false;

            this.views.engines.resize();

            return true;
        },

        render: function() {
            this.listenTo(this.views.engines, 'open-engine-by-id', this.openEngineById, this);

            this.listenTo(this.views.engines, 'open-by-group-id', this.openByGroupId, this);

            this.views.engines.render();

            this.el.append(this.views.engines.$el);

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

        openEngineById: function(engine_id) {
            this.request('data:state:set', 'engine-id', engine_id);

            this.request('ui:iframe:open');

            return true;
        },

        openByGroupId: function(group_id) {
            this.request('data:state:set', 'group-id', group_id);

            this.request('ui:engines:open');

            return true;
        }

    });

    return Engines;
});
