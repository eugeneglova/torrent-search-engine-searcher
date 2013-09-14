/*global define*/

define([
    'backbone',
    'hbs!../templates/group',
    './engine'
], function (Backbone, GroupTemplate, EngineView) {
    'use strict';

    var GroupView = Backbone.View.extend({

        template: GroupTemplate,

        className: 'group',

        // Reference to parent view
        parent: null,

        views: null,

        initialize: function(options) {
            this.views = {};

            this.parent = options.parent;

            return this;
        },

        render: function() {
            var column_count;

            this.clearViews();

            this.$el.html(this.template(this.model.toJSON()));

            column_count = Math.ceil(this.collection.length / 4);

            this.collection.forEach(function(model, index) {
                _.defer(function() {
                    var view, column;

                    view = new EngineView({
                        parent: this,
                        model:  model
                    });

                    column = Math.ceil(index/column_count);

                    this.$('.column-' + column).append(view.render().$el);

                    this.views[model.id] = view;
                }.bind(this));
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

    return GroupView;
});
