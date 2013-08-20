/*global define*/

define([
    'jquery',
    'backbone',
    'components/engine/index'
], function ($, Backbone, EngineView) {
    'use strict';

    var EnginesView = Backbone.UIController.extend({

        tagName: 'ul',

        className: 'engines',

        namespace: 'ui:engines',

        listeners: {
            'data:engines:ready': 'onDataEnginesReady'
        },

        // Reference to the engines collection
        engines: null,

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

            // Set primary engine
            this.announce('primary', this.engines.at(1).id);

            $('.left-sidebar').append(this.$el);

            return this;
        }

    });

    return EnginesView;
});
