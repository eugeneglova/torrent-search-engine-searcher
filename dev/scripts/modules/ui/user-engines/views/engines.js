/*global define*/

define([
    'underscore',
    'backbone',
    './engine'
], function (_, Backbone, EngineView) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'engines nav nav-list',

        events: {
            'scroll': 'onScroll'
        },

        // Reference to the scroll top
        scroll_top: null,

        // Reference to the engines collection
        collection: null,

        active_engine_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setActiveItemById: function(engine_id) {
            this.active_engine_id = engine_id;

            this.views[this.active_engine_id].toggleActiveClass(true);

            Object.keys(this.views).forEach(function(key) {
                if (String(this.active_engine_id) === key) return false;

                this.views[key].toggleActiveClass(false);
            }, this);

            return true;
        },

        resize: function() {
            var sidebar = $('.sidebar');

            this.$el.css('height', $(window).height() - $('.header').height() - $('.search').height() - sidebar.outerHeight() + sidebar.height());

            return true;
        },

        render: function() {
            this.clearViews();

            this.collection.forEach(function(model) {
                var view = new EngineView({
                    parent: this,
                    model:  model
                });

                if (this.active_engine_id === model.id) {
                    view.setIsActive(true);
                }

                this.$el.append(view.render().$el);

                this.views[model.id] = view;
            }, this);

            this.resize();

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

    return EnginesView;
});
