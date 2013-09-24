/*global define*/

define([
    'underscore',
    'backbone',
    'hbs!../templates/engines',
    'hbs!templates/ads/banner',
    './group',
    'components/breadcrumbs/index'
], function (_, Backbone, EnginesTemplate, BannerTemplate, GroupView, BreadcrumbsView) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        template: EnginesTemplate,

        className: 'engines container-fluid',

        // Reference to the engines collection
        engines: null,

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

        setEngines: function(engines) {
            this.engines = engines;

            return true;
        },

        setGroups: function(groups) {
            this.groups = groups;

            return true;
        },

        setGroup: function(group) {
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
                route: ''
            });

            if (this.group) {
                this.breadcrumbs.add({
                    name: 'Engines',
                    route: 'engines'
                });

                this.breadcrumbs.add({
                    name: this.group.get('name') + ' engines',
                    is_active: true
                });
            } else {
                this.breadcrumbs.add({
                    name: 'Engines',
                    is_active: true
                });
            }

            this.views.breadcrumbs = new BreadcrumbsView({
                collection: this.breadcrumbs
            });

            this.$el.append(this.views.breadcrumbs.render().el);

            this.$el.append(this.template({
                group: this.group
            }, {
                partials: {
                    templates_ads_banner: BannerTemplate
                }
            }));

            groups = this.group ? [this.group] : this.groups;

            groups.forEach(function(group) {
                var view, engines;

                engines = this.engines.where({ site_group_id: group.id });

                if (!engines.length) return false;

                view = this.views[group.id] = new GroupView({
                    parent:     this,
                    model:      group,
                    collection: engines,
                    group:      this.group
                });

                this.$('.groups').append(view.render().$el);

                this.views[group.id] = view;
            }, this);

            _.defer(function() {
                this.$('.engine').draggable({ revert: 'invalid', helper: 'clone' }).disableSelection();

                this.$('.droppable').droppable({

                    accept: '.user-engine',

                    activeClass: 'alert-success',

                    hoverClass: 'alert-info',

                    drop: function(e, ui) {
                        ui.draggable.trigger('drop');
                    }

                });
            }.bind(this));

            return this;
        },

        onDropEngine: function(e, ui) {
            ui.draggable.trigger('drop');

            return true;
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

    return EnginesView;
});
