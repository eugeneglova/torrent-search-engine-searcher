/*global define, document*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Head = Backbone.Controller.extend({

        namespace: 'ui:head',

        listeners: {
            ':set':             'onSet',
            ':set:title':       'onSetTitle',
            ':set:description': 'onSetDescription'
        },

        document: null,

        description: null,

        initialize: function() {
            this.document = document;

            this.description = $('meta[name=description]');

            return this;
        },

        onSet: function(attributes) {
            this.onSetTitle(attributes.head_title);

            this.onSetDescription(attributes.head_description);

            return true;
        },

        onSetTitle: function(title) {
            this.document.title = title;

            return true;
        },

        onSetDescription: function(description) {
            this.description.attr('content', description);

            return true;
        }

    });

    return Head;
});
