/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var EnginesRouter = Backbone.Router.extend({

        routes: {
            'engine/:engine(/search/:query)':                       'onEngine',
            'engine/:engine/search/:query(/category/:category)':    'onEngine',
            'engines':                                              'onEngines'
        },

        onEngine: function(engine_slug, query, category_slug) {
            this.trigger('open-engine', engine_slug, query, category_slug);

            return true;
        },

        onEngines: function() {
            this.trigger('open-engines');

            return true;
        }

    });

    return EnginesRouter;
});
