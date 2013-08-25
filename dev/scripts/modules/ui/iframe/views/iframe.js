/*global define*/

define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var IframeView = Backbone.View.extend({

        tagName: 'iframe',

        ui: null,

        // Reference to the engine model
        model: null,

        // Type 'home' or 'search'
        type: null,

        // Search query
        query: null,

        initialize: function() {
            this.ui = {
                window: $(window),
                navbar: $('.navbar'),
                search: $('.search')
            };

            return this;
        },

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
            this.$el.css('height', this.ui.window.height() - this.ui.navbar.height());

            return true;
        },

        render: function() {
            this.ui = {
                window: $(window),
                navbar: $('.navbar'),
                search: $('.search')
            };

            this.ui.window.on('resize', this.resize.bind(this));

            this.resize();

            if (this.type === 'home') {
                this.$el.attr('src', this.model.get('home_url'));
            } else if (this.type === 'search') {
                this.$el.attr('src', this.model.get('search_url').replace(/{keyword}/, this.query));
            }

            return this;
        }

    });

    return IframeView;
});
