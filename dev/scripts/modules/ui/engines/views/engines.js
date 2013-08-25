/*global define*/

define([
    'backbone',
    './engine'
], function (Backbone, EngineView) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'engines nav nav-list',

        ui: null,

        // Reference to the engines collection
        collection: null,

        active_engine_id: null,

        views: null,

        initialize: function() {
            this.ui = {
                window:     $(window),
                navbar:     null,
                sidebar:    $('.sidebar'),
                search:     $('.search')
            };

            this.views = {};

            this.ui.window.on('resize', this.resize.bind(this));

            return this;
        },

        setActiveEngineId: function(engine_id) {
            this.active_engine_id = engine_id;

            return true;
        },

        resize: function() {
            if (!this.ui.navbar || !this.ui.navbar.length) {
                this.ui.navbar = $('.navbar');
            }

            this.$el.css('height', this.ui.window.height() - this.ui.navbar.height() - this.ui.search.height() - this.ui.sidebar.outerHeight() + this.ui.sidebar.height());

            return true;
        },

        render: function() {
            this.remove();

            this.collection.forEach(function(engine_model) {
                this.views[engine_model.id] = new EngineView({
                    model: engine_model
                });

                if (this.active_engine_id === engine_model.id) {
                    this.views[engine_model.id].setIsActive(true);
                }

                this.$el.append(this.views[engine_model.id].render().$el);
            }, this);

            this.resize();

            return this;
        },

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            return Backbone.View.prototype.remove.call(this)
        }

    });

    return EnginesView;
});
