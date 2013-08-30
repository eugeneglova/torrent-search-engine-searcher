/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var EnginesRouter = Backbone.Router.extend({

        routes: {
            'engine/:slug': 'onEngine'
        },

        collection: null,

        initialize: function(options) {
            this.collection = options.collection;

            return this;
        },

        onEngine: function(slug) {
            var engines = this.collection.where({ slug: slug });

            if (!engines.length) return false;

            this.trigger('open-engine-by-id', engines[0].id);

            return true;
        }

    });

    return EnginesRouter;
});
