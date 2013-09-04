/*global define*/

define([
    'backbone',
    './models/contact'
], function (Backbone, ContactModel) {
    'use strict';

    var Contact = Backbone.Controller.extend({

        namespace: 'service:contact',

        listeners: {
            ':send': 'onSend'
        },

        // Reference to contact model
        model: null,

        initialize: function() {
            this.model = new ContactModel();

            return this;
        },

        onSend: function(fields, callback, context) {
            this.model.save(fields).then(callback.bind(context));

            return true;
        }

    });

    return Contact;
});
