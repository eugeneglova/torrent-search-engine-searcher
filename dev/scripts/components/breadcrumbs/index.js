/*global define*/

define([
    'backbone',
    './views/item'
], function (Backbone, ItemView) {
    'use strict';

    var BreadcrumbsView = Backbone.View.extend({

        tagName: 'ul',

        className: 'breadcrumb',

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        render: function() {
            this.remove();

            this.collection.forEach(function(model) {
                var view;

                view = this.views[model.id] = new ItemView({
                    parent: this,
                    model:  model
                });

                this.$el.append(view.render().$el);

                this.views[model.id] = view;
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

    return BreadcrumbsView;
});
