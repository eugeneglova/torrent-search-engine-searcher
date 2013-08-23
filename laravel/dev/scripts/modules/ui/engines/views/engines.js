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

        selected_engine_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setSelectedEngineId: function(engine_id) {
            this.selected_engine_id = engine_id;

            return true;
        },

        render: function() {
            this.collection.forEach(function(engine_model) {
                this.views[engine_model.id] = new EngineView({
                    model: engine_model
                });

                if (this.selected_engine_id === engine_model.id) {
                    this.views[engine_model.id].addSelectedClass();
                }

                this.$el.append(this.views[engine_model.id].render().$el);
            }, this);

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
