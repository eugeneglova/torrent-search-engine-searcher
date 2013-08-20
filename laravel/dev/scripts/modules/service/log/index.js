/*global define*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    var Log = Backbone.Controller.extend({

        namespace: 'service:log',

        listeners: {
            'all': 'onAll'
        },

        onAll: function() {
            console.log('log:', arguments);

            return true;
        }

    });

    return Log;
});
