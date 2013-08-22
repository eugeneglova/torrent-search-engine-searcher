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
            'keypress input': 'onEnter'
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        onEnter: function(e) {
            if (e.which === 13) {
                e.preventDefault();

                this.trigger('change', $(e.currentTarget).val());
            }

            return true;
        }

    });

    return SearchView;
});
