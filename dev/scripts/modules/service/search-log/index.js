/*global define*/

define([
    'backbone',
    './models/search'
], function (Backbone, SearchModel) {
    'use strict';

    var Searchlog = Backbone.Controller.extend({

        namespace: 'service:search-log',

        listeners: {
            ':send': 'onSend'
        },

        // Reference to search-log model
        model: null,

        initialize: function() {
            this.model = new SearchModel();

            return this;
        },

        onSend: function(fields) {
            this.model.save(fields);

            return true;
        }

    });

    return Searchlog;
});
