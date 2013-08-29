/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var EnginesRouter = Backbone.Router.extend({

        routes: {
            'engine/:slug': 'onEngine'
        },

        onEngine: function(slug) {
            return true;
        }

    });

    return EnginesRouter;
});
