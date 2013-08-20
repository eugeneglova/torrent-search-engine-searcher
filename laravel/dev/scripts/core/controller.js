/*global define*/

define([
    'underscore',
    'backbone-original',
    'core/mediator'
], function (_, Backbone, mediator) {
    'use strict';

    var Controller = Backbone.View.extend({

        constructor: function(options) {
            options = options || {};

            this.mediator = options.mediator ? options.mediator : mediator;

            this.registerListeners();

            Backbone.View.apply(this, arguments);
        },

        announce: function() {
            // Prepend controller namespace
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
            var event_name, method_name, method;

            if ( ! (events || (events = _.result(this, 'listeners')))) return this;

            for (event_name in events) {
                method_name = events[event_name];

                // Allow to use shorthand event names like ':eventName'
                // which will be prepended by this.namespace
                if (event_name.indexOf(':') === 0) {
                    event_name = this.namespace + event_name;
                }

                method = ! _.isFunction(method_name) ? this[method_name] : method_name;

                if ( ! method) {
                    throw new Error('Method "' + method_name + '" for namespace "' + event_name + '" should be defined within the controller.');
                }

                this.mediator.on(event_name, method, this);
            }

            return this;
        }

    });

    return Controller;
});
