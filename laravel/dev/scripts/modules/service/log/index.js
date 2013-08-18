/*global define*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    var Log = Backbone.Module.extend({

        namespace: 'service:log',

        events: {
            'all': 'onAll'
        },

        onAll: function() {
            console.log('log:', arguments);

            return true;
        }

    });

    return Log;
});
