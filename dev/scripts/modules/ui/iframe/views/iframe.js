/*global define, navigator*/

define([
    'underscore',
    'backbone',
    'hbs!../templates/iframe'
], function (_, Backbone, IframeTemplate) {
    'use strict';

    var IframeView = Backbone.View.extend({

        template: IframeTemplate,

        className: 'iframe-wrapper',

        // Reference to the engine model
        engine: null,

        // Reference to the category model
        category: null,

        // Type 'home' or 'search'
        type: null,

        // Search query
        query: null,

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

        resize: function() {
            this.$('iframe').css('height', $(window).height() - $('.header').height());

            return true;
        },

        replaceKeywordWithQuery: function(string) {
            return string.replace(/{keyword}/, this.query);
        },

        getSearchUrl: function() {
            if (this.type === 'home') {
                return this.engine.get('home_url');
            }

            if (this.type === 'search') {
                if (!this.category) {
                    return this.replaceKeywordWithQuery(this.engine.get('search_url'));
                } else {
                    return this.replaceKeywordWithQuery(this.category.get('search_url'));
                }
            }
        },

        getPostFields: function() {
            if (this.type === 'search') {
                if (!this.category) {
                    return this.getObjectArrayByQueryString(this.replaceKeywordWithQuery(this.engine.get('post_query')));
                } else {
                    return this.replaceKeywordWithQuery(this.category.get('post_query'));
                }
            }

            return [];
        },

        getObjectArrayByQueryString: function(query) {
            return query.split('&').map(function(item) {
                var parts;

                parts = item.split('=');

                return {
                    name: parts[0],
                    value: parts[1]
                };
            });
        },

        render: function() {
            var post_fields;

            // Do not render iframe if it is PhantomJS browser
            if (navigator.userAgent.match(/PhantomJS/i)) return this;

            post_fields = this.getPostFields();

            this.$el.html(this.template({
                search_url: this.getSearchUrl(),
                post_fields: post_fields
            }));

            this.resize();

            if (post_fields.length) {
                // Submit form right after render
                _.defer(function() {
                    this.$('form').submit();
                }.bind(this));
            }

            return this;
        }

    });

    return IframeView;
});
