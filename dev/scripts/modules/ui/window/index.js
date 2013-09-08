/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Resize = Backbone.Controller.extend({

        namespace: 'ui:window',

        listeners: {
            ':resize': 'onResize'
        },

        initialize: function() {
            $(window).on('resize', this.onResize.bind(this));

            return this;
        },

        onResize: function() {
            this.announce('resized');

            return true;
        }

    });

    return Resize;
});
