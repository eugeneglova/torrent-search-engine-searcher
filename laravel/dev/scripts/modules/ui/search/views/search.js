/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var SearchView = Backbone.View.extend({

        tagName: 'input',

        className: 'input-medium search-query',

        events: {
            'change':     'onChange',
            'keypress':   'onSubmit'
        },

        render: function() {
            return this;
        },

        onChange: function(e) {
            e.preventDefault();

            this.trigger('change', $(e.currentTarget).val());

            return true;
        },

        onSubmit: function(e) {
            if (e.which === 13) {
                e.preventDefault();

                this.trigger('submit', $(e.currentTarget).val());
            }

            return true;
        }

    });

    return SearchView;
});
