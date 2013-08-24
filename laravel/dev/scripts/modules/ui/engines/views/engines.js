/*global define*/

define([
    'backbone',
    './engine'
], function (Backbone, EngineView) {
    'use strict';

    var EnginesView = Backbone.View.extend({

        tagName: 'ul',

        className: 'nav nav-list engines',

        // Reference to the engines collection
        collection: null,

        active_engine_id: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setActiveEngineId: function(engine_id) {
            this.active_engine_id = engine_id;

            return true;
        },

        render: function() {
            this.collection.forEach(function(engine_model) {
                this.views[engine_model.id] = new EngineView({
                    model: engine_model
                });

                if (this.active_engine_id === engine_model.id) {
                    this.views[engine_model.id].setIsActive(true);
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
