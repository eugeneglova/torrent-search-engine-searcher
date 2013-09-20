/*global define*/

define([
    'backbone',
    'hbs!../templates/group',
    './site'
], function (Backbone, GroupTemplate, SiteView) {
    'use strict';

    var GroupView = Backbone.View.extend({

        template: GroupTemplate,

        className: 'group',

        events: {
            'click .site-group-link': 'onClickSiteGroupLink'
        },

        // Reference to parent view
        parent: null,

        views: null,

        initialize: function(options) {
            this.views = {};

            this.parent = options.parent;

            this.groups = options.groups;

            this.total = options.total;

            this.group = options.group;

            return this;
        },

        render: function() {
            var column_count;

            this.clearViews();

            this.$el.html(this.template(_.extend(this.model.toJSON(), {
                more:   this.total > this.collection.length,
                total:  this.total,
                group:  this.group
            })));

            column_count = Math.ceil(this.collection.length / 4);

            this.collection.forEach(function(model, index) {
                _.defer(function() {
                    var view, column;

                    view = new SiteView({
                        parent: this.parent,
                        groups: this.groups,
                        model:  model
                    });

                    column = Math.ceil((index + 1) / column_count);

                    this.$('.column-' + column).append(view.render().$el);

                    this.views[model.id] = view;
                }.bind(this));
            }, this);

            return this;
        },

        onClickSiteGroupLink: function(e) {
            e.preventDefault();

            this.parent.trigger('open-by-group-id', this.model.id);

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

    return GroupView;
});
