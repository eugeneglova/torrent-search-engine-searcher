/*global define*/

define([
    'underscore',
    'backbone',
    'hbs!../templates/engines',
    'hbs!templates/ads/banner',
    './group'
], function (_, Backbone, EnginesTemplate, BannerTemplate, GroupView) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        template: EnginesTemplate,

        className: 'engines',

        events: {
            'scroll': 'onScroll'
        },

        // Reference to the scroll top
        scroll_top: null,

        // Reference to the engines collection
        engines: null,

        // Reference to the groups collection
        groups: null,

        // Reference to the active group model
        active_group: null,

        views: null,

        initialize: function() {
            this.views = {};

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

        setActiveGroup: function(group) {
            this.active_group = null;

            if (!group) return false;

            this.active_group = group;

            return true;
        },

        onScroll: function(e) {
            // Save scroll position
            this.scroll_top = e.currentTarget.scrollTop;

            return true;
        },

        resize: function() {
            this.$el.css('height', $(window).height() - $('.header').height());

            return true;
        },

        render: function() {
            var groups;

            this.clearViews();

            this.resize();

            this.$el.html(this.template({
                active_group: this.active_group
            }, {
                partials: {
                    templates_ads_banner: BannerTemplate
                }
            }));

            groups = this.active_group ? [this.active_group] : this.groups;

            groups.forEach(function(group) {
                var view, engines;

                engines = this.engines.where({ site_group_id: group.id });

                if (!engines.length) return false;

                view = this.views[group.id] = new GroupView({
                    parent:         this,
                    model:          group,
                    collection:     engines,
                    active_group:   this.active_group
                });

                this.$('.groups').append(view.render().$el);

                this.views[group.id] = view;
            }, this);

            // Restore scroll position
            _.defer(function() {
                this.$el.get(0).scrollTop = this.scroll_top;

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

        clearViews: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
                delete this.views[key];
            }, this);

            return true;
        }

    });

    return EnginesView;
});
