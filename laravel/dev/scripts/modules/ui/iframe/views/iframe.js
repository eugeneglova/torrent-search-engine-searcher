/*global define*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    var IframeView = Backbone.View.extend({

        tagName: 'iframe',

        render: function() {
            this.$el.attr('src', 'about:blank');

            return this;
        }

    });

    return IframeView;
});
