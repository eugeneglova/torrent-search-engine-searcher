/*global define*/

define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var IframeView = Backbone.View.extend({

        tagName: 'iframe',

        window: $(window),

        // Reference to the engine model
        model: null,

        // Type 'open' or 'submit'
        type: null,

        // Search query
        query: null,

        setModel: function(model) {
            this.model = model;

            return true;
        },

        setType: function(type) {
            this.type = type;

            return true;
        },

        setQuery: function(query) {
            this.query = query;

            return true;
        },

        resize: function() {
            this.$el.css('height', this.window.height());

            return true;
        },

        render: function() {
            this.window.on('resize', this.resize.bind(this));

            this.resize();

            if (this.type === 'open') {
                this.$el.attr('src', this.model.get('home_url'));
            } else if (this.type === 'submit') {
                this.$el.attr('src', this.model.get('search_url').replace(/{keyword}/, this.query));
            }

            return this;
        }

    });

    return IframeView;
});
