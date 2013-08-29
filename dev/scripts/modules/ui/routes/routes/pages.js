/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var PagesRouter = Backbone.Router.extend({

        routes: {
            'page/:slug':   'onPage'
        },

        onPage: function(slug) {
            return true;
        }

    });

    return PagesRouter;
});
