/*global define*/

define([
    'underscore',
    'backbone-original'
], function (_, Backbone) {
    'use strict';

    var Module = Backbone.View.extend({

        constructor: function(options) {

            this.mediator = options.mediator;

            this.registerListeners();

            Backbone.View.apply(this, arguments);
        },

        announce: function() {
            // Prepend module namespace
            arguments[0] = this.namespace + ':' + arguments[0];

            this.request.apply(this, arguments);

            return this;
        },

        request: function() {
            // Trigger event to mediator
            this.mediator.trigger.apply(this.mediator, arguments);

            return this;
        },

        registerListeners: function(events) {
            var event_name, method;

            if ( ! (events || (events = _.result(this, 'listeners')))) return this;

            for (event_name in events) {
                method = events[event_name];

                // Allow to use shorthand event names like ':eventName'
                // which will be prepended by this.namespace
                if (event_name.indexOf(':') === 0) {
                    event_name = this.namespace + event_name;
                }

                if ( ! _.isFunction(method)) method = this[method];

                if ( ! method) continue;

                this.mediator.on(event_name, method, this);
            }

            return this;
        }

    });

    return Module;
});
