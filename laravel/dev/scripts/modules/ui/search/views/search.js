/*global define*/

define([
    'jquery',
    'backbone',
    'hbs!../templates/search'
], function ($, Backbone, SearchTemplate) {
    'use strict';

    var SearchView = Backbone.View.extend({

        template: SearchTemplate,

        events: {
            'change input':     'onChange',
            'keypress input':   'onSubmit'
        },

        render: function() {
            this.$el.html(this.template());

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
