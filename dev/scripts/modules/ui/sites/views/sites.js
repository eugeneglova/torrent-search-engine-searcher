/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/sites',
    'hbs!templates/ads/banner',
    './group'
], function ($, _, Backbone, SitesTemplate, BannerTemplate, GroupView) {
    'use strict';

    var SitesView = Backbone.View.extend({

        template: SitesTemplate,

        className: 'sites',

        // Reference to the sites collection
        sites: null,

        // Reference to the groups collection
        groups: null,

        // Reference to the active group model
        group: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setSites: function(sites) {
            this.sites = sites;

            return true;
        },

        setGroups: function(groups) {
            this.groups = groups;

            return true;
        },

        setActiveGroup: function(group) {
            this.group = null;

            if (!group) return false;

            this.group = group;

            return true;
        },

        resize: function() {
            this.$el.css('height', $(window).height() - $('.header').outerHeight(true));

            return true;
        },

        render: function() {
            var groups;

            this.clearViews();

            this.resize();

            this.$el.html(this.template({
                group: this.group
            }, {
                partials: {
                    templates_ads_banner: BannerTemplate
                }
            }));

            groups = this.group ? this.groups.chain().where({ id: this.group.id }) : this.groups.chain();

            groups.forEach(function(group) {
                var view, sites, total;

                sites = this.sites.where({ site_group_id: group.id });

                total = sites.length;

                if (!this.group) {
                    sites = _.first(sites, 16);
                }

                if (!sites.length) return false;

                view = this.views[group.id] = new GroupView({
                    parent:     this,
                    model:      group,
                    collection: sites,
                    groups:     groups,
                    total:      total,
                    group:      this.group
                });

                this.$('.groups').append(view.render().$el);

                this.views[group.id] = view;
            }, this);

            return this;
        },

        clearViews: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
                delete this.views[key];
            }, this);

            return true;
        }

    });

    return SitesView;
});
