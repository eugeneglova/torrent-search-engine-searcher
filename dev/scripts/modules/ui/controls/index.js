/*global define*/

define([
    'backbone',
    './views/controls'
], function (Backbone, ControlsView) {
    'use strict';

    var Controls = Backbone.UIController.extend({

        namespace: 'ui:controls',

        el: null,

        views: null,

        initialize: function() {
            this.el = $('.header');

            this.views = {};

            this.views.controls = new ControlsView();

            this.listenTo(this.views.controls, 'open-engines', this.onOpenEngines, this);

            this.render();

            return this;
        },

        render: function() {
            this.views.controls.render();

            this.el.append(this.views.controls.$el);

            return this;
        },

        onOpenEngines: function() {
            this.request('ui:available-engines:toggle');

            return true;
        }

    });

    return Controls;
});
