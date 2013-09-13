/*global define*/

define([
    'underscore',
    'backbone',
    'hbs!../templates/engines',
    './engine'
], function (_, Backbone, EnginesTemplate, EngineView) {
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

        active_engine_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setEngines: function(engines) {
            this.engines = engines;

            return true;
        },

        setActiveItemById: function(engine_id) {
            this.active_engine_id = engine_id;

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
            var column_count;

            this.clearViews();

            this.resize();

            this.$el.html(this.template());

            column_count = Math.ceil(this.engines.length / 4);

            this.engines.forEach(function(model, index) {
                _.defer(function() {
                    var view, column;

                    view = new EngineView({
                        parent: this,
                        model:  model
                    });

                    if (this.active_engine_id === model.id) {
                        view.setIsActive(true);
                    }

                    column = Math.ceil(index/column_count);

                    this.$('.column-' + column).append(view.render().$el);

                    this.views[model.id] = view;
                }.bind(this));
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
