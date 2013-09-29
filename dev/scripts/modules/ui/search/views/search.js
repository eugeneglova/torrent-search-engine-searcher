/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var SearchView = Backbone.View.extend({

        tagName: 'input',

        className: 'search-query span12',

        events: {
            'change':   'onChange',
            'keyup':    'onKeyUp',
            'keypress': 'onKeyPress'
        },

        // Reference to search query
        query: null,

        initialize: function() {
            this.$el.attr('type', 'text');
            this.$el.attr('placeholder', 'Search');

            return this;
        },

        setQuery: function(query) {
            this.query = query;

            return true;
        },

        render: function() {
            this.$el.val(this.query);

            return this;
        },

        onChange: function(e) {
            e.preventDefault();

            this.trigger('change', $(e.currentTarget).val());

            return true;
        },

        onKeyUp: function(e) {
            _.throttle(function() {
                this.trigger('change', $(e.currentTarget).val(), { silent: true });
            }.bind(this), 300)();

            return true;
        },

        onKeyPress: function(e) {
            if (e.which === 13) {
                e.preventDefault();

                this.trigger('submit', $(e.currentTarget).val());
            }

            return true;
        }

    });

    return SearchView;
});
