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

        collection: null,

        initialize: function(options) {
            this.collection = options.collection;

            return this;
        },

        onHomePage: function() {
            this.trigger('open-page-by-id', this.collection.at(0).id);

            return true;
        },

        onPage: function(slug) {
            var pages = this.collection.where({ slug: slug });

            if (!pages.length) return false;

            this.trigger('open-page-by-id', pages[0].id);

            return true;
        }

    });

    return PagesRouter;
});
