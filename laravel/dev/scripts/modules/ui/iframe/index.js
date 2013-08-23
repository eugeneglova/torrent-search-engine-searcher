/*global define*/

define([
    'backbone',
    './views/iframe'
], function (Backbone, IframeView) {
    'use strict';

    var Iframe = Backbone.UIController.extend({

        namespace: 'ui:iframe',

        listeners: {
            'data:search:request:open':     'onOpen',
            'data:search:request:submit':   'onSubmit'
        },

        el: null,

        views: null,

        initialize: function() {
            this.el = $('.iframe');

            this.views = {};

            this.views.iframe = new IframeView();

            return this;
        },

        onOpen: function() {
            this.request('data:search:get:engine-id', this.getEngineIdAndOpen, this);

            return true;
        },

        onSubmit: function() {
            this.render();

            return true;
        },

        getEngineIdAndOpen: function(engine_id) {
            this.render();

            return true;
        },

        render: function() {
            this.views.iframe.render();

            this.el.append(this.views.iframe.$el);

            return this;
        }

    });

    return Iframe;
});
