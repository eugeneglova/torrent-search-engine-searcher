/*global define*/

define([
    'backbone',
    './item'
], function (Backbone, ItemView) {
    'use strict';

    var SearchesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'recent-searches',

        // Reference to the engines collection
        collection: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        render: function() {
            this.clearViews();

            this.collection.forEach(function(model) {
                var view, engine;

                engine = this.collection.engines.get(model.get('engine_id'));

                if (!engine) return false;

                view = new ItemView({
                    parent: this,
                    model:  model,
                    engine: engine
                });

                this.$el.append(view.render().$el);

                this.views[model.id] = view;
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

    return SearchesView;
});
