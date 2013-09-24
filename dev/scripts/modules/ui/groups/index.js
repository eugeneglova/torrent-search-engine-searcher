/*global define*/

define([
    'underscore',
    'backbone',
    './views/groups'
], function (_, Backbone, GroupsView) {
    'use strict';

    var Groups = Backbone.UIController.extend({

        namespace: 'ui:groups',

        listeners: {
            'data:groups:ready':    'onDataGroupsReady',
            'ui:engines:open':      'onEnginesOpen',
            'ui:iframe:open':       'onIframeOpen',
            'ui:page:open':         'onIframeOpen'
        },

        el: null,

        views: null,

        // Reference to the groups collection
        groups: null,

        initialize: function() {
            _.defer(function() {
                this.el = $('.nav-collapse');
            }.bind(this));

            this.views = {};

            return this;
        },

        onDataGroupsReady: function() {
            this.request('data:groups:get', this.onDataGroupsGet, this);

            return true;
        },

        onDataGroupsGet: function(groups) {
            this.groups = groups;

            this.views.groups = new GroupsView({
                groups: this.groups
            });

            this.listenTo(this.views.groups, 'open-group-by-id', this.openGroupById, this);

            this.listenTo(this.views.groups, 'open-engines', this.openEngines, this);

            this.render();

            this.request('ui:window:resize');

            this.announce('ready');

            return true;
        },

        onEnginesOpen: function() {
            this.request('data:state:get', 'group-id', this.onGetGroupId, this);

            return true;
        },

        onGetGroupId: function(group_id) {
            this.views.groups.setActiveItemById(group_id || 'engines');

            this.render();

            return true;
        },

        onIframeOpen: function() {
            this.views.groups.setActiveItemById(null);

            this.render();

            return true;
        },

        render: function() {
            this.views.groups.render();

            this.el.append(this.views.groups.$el);

            return this;
        },

        openGroupById: function(group_id) {
            this.request('data:state:set', 'group-id', group_id);

            this.request('ui:engines:open');

            return true;
        },

        openEngines: function() {
            this.request('data:state:set', 'group-id', undefined);

            this.request('ui:engines:open');

            return true;
        }

    });

    return Groups;
});
