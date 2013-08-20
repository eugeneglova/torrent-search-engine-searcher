/*global define*/

define([
    'backbone',
    'components/engine/index'
], function (Backbone, Engine) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'engines',

        // Reference to the engines collection
        collection: null,

        render: function() {
            this.$el.empty();

            this.collection.forEach(function(engine_model) {
                new Engine({
                    el: this.$el,
                    model: engine_model
                }).render();
            }, this);

            return this;
        }

    });

    return EnginesView;
});
