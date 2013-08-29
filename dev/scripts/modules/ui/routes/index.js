/*global define*/

define([
    'backbone',
    './routes/engines',
    './routes/pages'
], function (Backbone, EnginesRouter, PagesRouter) {
    'use strict';

    var Routes = Backbone.UIController.extend({

        namespace: 'ui:routes',

        listeners: {
            'app:loader:ready':    'onLoaderReady'
        },

        // Reference to the routers object
        routers: null,

        initialize: function() {
            this.routers = {};

            return this;
        },

        onLoaderReady: function() {
            this.routers.engines = new EnginesRouter();

            this.routers.pages = new PagesRouter();

            Backbone.history.start({ pushState: true });

            return true;
        }

    });

    return Routes;
});
