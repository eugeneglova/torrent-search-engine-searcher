/*global define*/

define([
    'backbone',
    './engine'
], function (Backbone, EngineView) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'engines',

        // Reference to the engines collection
        collection: null,

        render: function() {
            this.$el.empty();

            this.collection.forEach(function(engine_model) {
                var engine_view = new EngineView({
                    model: engine_model
                });

                this.$el.append(engine_view.render().$el);
            }, this);

            return this;
        }

    });

    return EnginesView;
});
