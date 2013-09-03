/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var EnginesRouter = Backbone.Router.extend({

        routes: {
            'engine/:engine(/search/:query)':                       'onEngine',
            'engine/:engine/search/:query(/category/:category)':    'onEngine'
        },

        onEngine: function(engine, query, category) {
            this.trigger('open-engine', engine, query, category);

            return true;
        }

    });

    return EnginesRouter;
});
