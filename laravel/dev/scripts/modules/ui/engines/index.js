/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!./templates/engines'
], function ($, _, Backbone, EnginesTemplate) {
    'use strict';

    var EnginesView = Backbone.UIModule.extend({

        template: EnginesTemplate,

        tagName: 'ul',

        // Reference to the engines collection
        engines: null,

        listeners: {
            'data:engines:ready': 'onDataEnginesReady'
        },

        events: {
            'click li': 'onClickEngine'
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

        onClickEngine: function(e) {
            e.preventDefault();

            return true;
        },

        render: function() {
            this.$el.html(this.template({
                engines: this.engines.toJSON()
            }));

            $('.hero-unit').append(this.$el);

            return this;
        }

    });

    return EnginesView;
});
