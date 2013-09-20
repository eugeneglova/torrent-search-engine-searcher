/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var SitesRouter = Backbone.Router.extend({

        routes: {
            'sites/:group/:site':   'onSite',
            'sites(/:group)':       'onSites'
        },

        onSite: function(group_slug, site_slug) {
            this.trigger('open-site', group_slug, site_slug);

            return true;
        },

        onSites: function(group) {
            this.trigger('open-sites', group);

            return true;
        }

    });

    return SitesRouter;
});
