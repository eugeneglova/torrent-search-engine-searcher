/*global define*/

define([
    'jquery.ui.sortable',
    'backbone',
    './engine'
], function ($, Backbone, EngineView) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'user-engines nav nav-list',

        events: {
            'sortupdate': 'onSortUpdate'
        },

        // Reference to the engines collection
        collection: null,

        active_engine_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        onSortUpdate: function() {
            this.trigger('sort-update', this.$el.sortable('toArray', { attribute: 'data-id' }));

            return true;
        },

        setActiveItemById: function(engine_id) {
            this.active_engine_id = engine_id;

            if (!this.views[this.active_engine_id]) return false;

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

            this.listenTo(this.collection, 'add remove', this.render, this);

            this.collection.forEach(function(model) {
                var view = new EngineView({
                    parent: this,
                    model:  model
                });

                this.$el.append(view.render().$el);

                this.views[model.id] = view;
            }, this);

            this.$el.sortable().disableSelection();

            this.$el.droppable({

                accept: '.engine',

                activeClass: 'alert-success',

                hoverClass: 'alert-info',

                drop: function(e, ui) {
                    this.trigger('add-engine-by-id', ui.draggable.attr('data-id'));
                }.bind(this)

            });

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
