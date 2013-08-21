/*global define*/

define([
    'backbone',
    'hbs!../templates/search'
], function (Backbone, SearchTemplate) {
    'use strict';

    var SearchView = Backbone.View.extend({

        template: SearchTemplate,

        render: function() {
            this.$el.html(this.template());

            return this;
        }

    });

    return SearchView;
});
