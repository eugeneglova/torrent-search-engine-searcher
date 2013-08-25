/*global define*/

define([
    'jquery',
    'backbone',
    'hbs!../templates/iframe'
], function ($, Backbone, IframeTemplate) {
    'use strict';

    var IframeView = Backbone.View.extend({

        template: IframeTemplate,

        className: 'iframe-wrapper',

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
                navbar: null,
                search: null
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

        prepareResize: function() {
            if (!this.ui.navbar || !this.ui.navbar.length) {
                this.ui.navbar = $('.navbar');
            }

            if (!this.ui.search || !this.ui.search.length) {
                this.ui.search = $('.search');
            }

            this.ui.window.on('resize', this.resize.bind(this));

            return true;
        },

        resize: function() {
            this.$('iframe').css('height', this.ui.window.height() - this.ui.navbar.height());

            return true;
        },

        render: function() {
            var src;

            if (this.type === 'home') {
                src = this.model.get('home_url');
            } else if (this.type === 'search') {
                src = this.model.get('search_url').replace(/{keyword}/, this.query);
            }

            this.$el.html(this.template(_.extend(this.model.toJSON(), {
                src: src
            })));

            this.prepareResize();

            this.resize();

            return this;
        }

    });

    return IframeView;
});
