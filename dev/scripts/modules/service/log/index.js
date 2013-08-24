/*global define*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    var Log = Backbone.Controller.extend({

        namespace: 'service:log',

        listeners: {
            // 'all':      'onAll',
            'request':  'onRequest',
            'announce': 'onAnnounce'
        },

        is_log_available: null,

        initialize: function() {
            this.is_log_available = console && console.log;

            return this;
        },

        log: function() {
            if (!this.is_log_available) return false;

            console.log.apply(console, arguments);

            return true;
        },

        onRequest: function() {
            this.log('request:', arguments);

            return true;
        },

        onAnnounce: function() {
            this.log('announce:', arguments);

            return true;
        },

        onAll: function() {
            this.log('log:', arguments);

            return true;
        }

    });

    return Log;
});
