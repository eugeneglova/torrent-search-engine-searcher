/*global define*/

define([
    'backbone',
    'hbs!../templates/navbar',
    './item'
], function (Backbone, NavbarTemplate, ItemView) {
    'use strict';

    var NavbarView = Backbone.View.extend({

        template: NavbarTemplate,

        className: 'navbar navbar-static-top',

        // Reference to the engines collection
        collection: null,

        active_item_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setActiveItemId: function(item_id) {
            this.active_item_id = item_id;

            return true;
        },

        render: function() {
            this.clearViews();

            this.$el.html(this.template());

            this.collection.forEach(function(item_model) {
                var view = new ItemView({
                    parent: this,
                    model:  item_model
                });

                if (this.active_item_id === item_model.id) {
                    view.setIsActive(true);
                }

                this.$('.nav').append(view.render().$el);

                this.views[item_model.id] = view;
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

    return NavbarView;
});
