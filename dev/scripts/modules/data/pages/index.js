/*global define*/

define([
    'backbone',
    './collections/pages'
], function (Backbone, PagesCollection) {
    'use strict';

    var Pages = Backbone.Controller.extend({

        namespace: 'data:pages',

        listeners: {
            ':get': 'onGet'
        },

        // Reference to the pages collection
        pages: null,

        initialize: function() {
            // Initialize pages collection
            this.pages = new PagesCollection();

            this.listenTo(this.pages, 'reset', this.onReset, this);

            this.pages.fetch({ reset: true });

            return this;
        },

        onGet: function(callback, context) {
            callback.apply(context, [this.pages]);

            return true;
        },

        onReset: function() {
            this.announce('ready');

            return true;
        }

    });

    return Pages;
});
