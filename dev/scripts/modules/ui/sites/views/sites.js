/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/sites',
    'hbs!templates/ads/banner',
    './group',
    'components/breadcrumbs/index'
], function ($, _, Backbone, SitesTemplate, BannerTemplate, GroupView, BreadcrumbsView) {
    'use strict';

    var SitesView = Backbone.View.extend({

        template: SitesTemplate,

        className: 'sites container-fluid',

        // Reference to the sites collection
        sites: null,

        // Reference to the groups collection
        groups: null,

        // Reference to the active group model
        group: null,

        breadcrumbs: null,

        views: null,

        initialize: function() {
            this.views = {};

            this.breadcrumbs = new Backbone.Collection();

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

            this.$el.empty();

            this.resize();

            this.breadcrumbs.reset();

            this.breadcrumbs.add({
                name: 'Home',
                url: '/'
            });

            if (this.group) {
                this.breadcrumbs.add({
                    name: 'File Sharing Directory',
                    url: '/sites/'
                });

                this.breadcrumbs.add({
                    name: this.group.get('name') + ' sites',
                    is_active: true
                });
            } else {
                this.breadcrumbs.add({
                    name: 'File Sharing Directory',
                    is_active: true
                });
            }

            this.views.breadcrumbs = new BreadcrumbsView({
                collection: this.breadcrumbs
            });

            this.$el.append(this.views.breadcrumbs.render().$el);

            this.$el.append(this.template({
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

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
                delete this.views[key];
            }, this);

            Backbone.View.prototype.remove.apply(this, arguments);

            return true;
        }

    });

    return SitesView;
});
