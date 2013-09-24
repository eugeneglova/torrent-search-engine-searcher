/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/site',
    'hbs!templates/ads/banner',
    'components/breadcrumbs/index'
], function ($, _, Backbone, SiteTemplate, BannerTemplate, BreadcrumbsView) {
    'use strict';

    var SiteView = Backbone.View.extend({

        template: SiteTemplate,

        className: 'site container-fluid',

        // Reference to the site model
        site: null,

        // Reference to the group model
        group: null,

        breadcrumbs: null,

        views: null,

        initialize: function() {
            this.views = {};

            this.breadcrumbs = new Backbone.Collection();

            return this;
        },

        setSite: function(site) {
            this.site = site;

            return true;
        },

        setGroup: function(group) {
            this.group = group;

            this.breadcrumbs.reset();

            this.breadcrumbs.add({
                name: 'Home',
                url: '/'
            });

            this.breadcrumbs.add({
                name: 'File Sharing Directory',
                url: '/sites/'
            });

            this.breadcrumbs.add({
                name: this.group.get('name') + ' sites',
                url: '/sites/' + this.group.get('slug')
            });

            this.breadcrumbs.add({
                name: this.site.get('name'),
                is_active: true
            });

            return true;
        },

        resize: function() {
            this.$el.css('height', $(window).height() - $('.header').outerHeight(true));

            return true;
        },

        render: function() {
            this.$el.empty();

            this.resize();

            this.views.breadcrumbs = new BreadcrumbsView({
                collection: this.breadcrumbs
            });

            this.$el.append(this.views.breadcrumbs.render().$el);

            this.$el.append(this.template(_.extend({}, this.site.toJSON(), {
                group: this.group.toJSON()
            }), {
                partials: {
                    templates_ads_banner: BannerTemplate
                }
            }));

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

    return SiteView;
});
