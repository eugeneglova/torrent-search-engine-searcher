/*global define*/

define([
    'underscore',
    'backbone-original',
    'core/mediator'
], function (_, Backbone, mediator) {
    'use strict';

    var Controller = function(options) {
        this.options = options || {};

        this.mediator = this.options.mediator || mediator;

        this.views = null;

        if (this.options.el) {
            this.el = this.options.el;
        }

        if (this.options.model) {
            this.model = this.options.model;
        }

        this.registerListeners();

        if (_.isFunction(this.initialize)) {
            this.initialize(this.options);
        }
    };

    Controller.extend = Backbone.Model.extend;

    _.extend(Controller.prototype, Backbone.Events, {

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
