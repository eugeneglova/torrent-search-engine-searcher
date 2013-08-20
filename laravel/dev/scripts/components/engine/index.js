/*global define*/

define([
    'backbone',
    './views/engine'
], function (Backbone, EngineView) {
    'use strict';

    var Engine = Backbone.UIController.extend({

        namespace: 'ui:engine',

        listeners: {
            'ui:engines:primary': 'onUiEnginesPrimary'
        },

        model: null,

        initialize: function(options) {
            this.views = {};

            this.views.engine = new EngineView({
                model: this.options.model
            });

            return this;
        },

        render: function() {
            this.views.engine.render();

            this.el.append(this.views.engine.$el);

            return this;
        },

        onUiEnginesPrimary: function(id) {
            this.views.engine.$el.removeClass('btn-primary');

            if (this.model.id === id) {
                this.views.engine.$el.addClass('btn-primary');
            }

            return true;
        }

    });

    return Engine;
});
