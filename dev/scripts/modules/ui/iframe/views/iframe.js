/*global define, navigator*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/iframe'
], function ($, _, Backbone, IframeTemplate) {
    'use strict';

    var IframeView = Backbone.View.extend({

        template: IframeTemplate,

        className: 'iframe-wrapper',

        ui: null,

        // Reference to the engine model
        engine: null,

        // Reference to the category model
        category: null,

        // Type 'home' or 'search'
        type: null,

        // Search query
        query: null,

        initialize: function() {
            this.ui = {
                window: $(window),
                header: $('.header')
            };

            return this;
        },

        setEngine: function(engine) {
            this.engine = engine;

            return true;
        },

        setCategory: function(category) {
            this.category = category;

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
            this.ui.window.on('resize', this.resize.bind(this));

            return true;
        },

        resize: function() {
            this.$('iframe').css('height', this.ui.window.height() - this.ui.header.height());

            return true;
        },

        render: function() {
            var src;

            if (this.type === 'home') {
                src = this.engine.get('home_url');
            } else if (this.type === 'search') {
                if (!this.category) {
                    src = this.engine.get('search_url').replace(/{keyword}/, this.query);
                } else {
                    src = this.category.get('search_url').replace(/{keyword}/, this.query);
                }
            }

            // Do not render iframe if it is PhantomJS browser
            if (navigator.userAgent.match(/PhantomJS/i)) return this;

            this.$el.html(this.template({
                src: src
            }));

            this.prepareResize();

            this.resize();

            return this;
        }

    });

    return IframeView;
});
