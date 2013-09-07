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

        ui: null,

        // Reference to the scroll top
        scroll_top: null,

        // Reference to the engines collection
        collection: null,

        active_engine_id: null,

        views: null,

        initialize: function() {
            this.ui = {
                window:     $(window),
                header:     $('.header'),
                sidebar:    $('.sidebar'),
                search:     $('.search')
            };

            this.views = {};

            this.ui.window.on('resize', this.resize.bind(this));

            return this;
        },

        onScroll: function(e) {
            // Save scroll position
            this.scroll_top = e.currentTarget.scrollTop;

            return true;
        },

        setActiveItemById: function(engine_id) {
            this.active_engine_id = engine_id;

            return true;
        },

        resize: function() {
            this.$el.css('height', this.ui.window.height() - this.ui.header.height() - this.ui.search.height() - this.ui.sidebar.outerHeight() + this.ui.sidebar.height());

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

            // Restore scroll position
            _.defer(function() {
                this.$el.get(0).scrollTop = this.scroll_top;
            }.bind(this));

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
