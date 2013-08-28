/*global define, ga*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Analytics = Backbone.Controller.extend({

        namespace: 'service:analytics',

        listeners: {
            ':event': 'onEvent'
        },

        // Reference to google analytics ga variable
        ga: null,

        initialize: function() {
            this.ga = ga;

            return this;
        },

        onEvent: function(category, action, label, value) {
            if (this.ga) {
                this.ga('send', 'event', category, action, label, value);
            }

            return true;
        }

    });

    return Analytics;
});
