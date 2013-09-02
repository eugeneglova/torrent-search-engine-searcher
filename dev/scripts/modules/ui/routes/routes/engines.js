/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var EnginesRouter = Backbone.Router.extend({

        routes: {
            'engine/:engine(/torrent/:query)':                      'onEngine',
            'engine/:engine/torrent/:query(/category/:category)':   'onEngine'
        },

        onEngine: function(engine, query, category) {
            this.trigger('open-engine', engine, query, category);

            return true;
        }

    });

    return EnginesRouter;
});
