/*global define, document*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Head = Backbone.Controller.extend({

        namespace: 'ui:head',

        listeners: {
            ':set': 'onSet'
        },

        document: null,

        description: null,

        initialize: function() {
            this.document = document;

            this.description = $('meta[name=description]');

            return this;
        },

        onSet: function(attributes) {
            this.document.title = attributes.title;

            this.description.attr('content', attributes.description);

            return true;
        }

    });

    return Head;
});
