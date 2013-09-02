/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var PagesRouter = Backbone.Router.extend({

        routes: {
            '':             'onHomePage',
            'page/:slug':   'onPage'
        },

        onHomePage: function() {
            this.trigger('open-page-by-name', 'home');

            return true;
        },

        onPage: function(page) {
            this.trigger('open-page-by-name', page);

            return true;
        }

    });

    return PagesRouter;
});
