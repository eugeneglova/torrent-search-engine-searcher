/*global define*/

define([
    'jquery',
    'backbone',
    'components/engine/index'
], function ($, Backbone, EngineView) {
    'use strict';

    var EnginesView = Backbone.UIModule.extend({

        tagName: 'ul',

        className: 'engines',

        // Reference to the engines collection
        engines: null,

        listeners: {
            'data:engines:ready': 'onDataEnginesReady'
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGet, this);

            return true;
        },

        onDataEnginesGet: function(engines) {
            this.engines = engines;

            this.render();

            return true;
        },

        render: function() {
            this.$el.empty();

            this.engines.forEach(function(engine) {
                var engine_view = new EngineView({
                    model: engine
                });

                engine_view.render();

                this.$el.append(engine_view.$el);
            }, this);

            $('.left-sidebar').append(this.$el);

            return this;
        }

    });

    return EnginesView;
});
