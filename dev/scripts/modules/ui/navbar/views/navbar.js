/*global define*/

define([
    'backbone',
    'hbs!../templates/navbar'
], function (Backbone, NavbarTemplate) {
    'use strict';

    var NavbarView = Backbone.View.extend({

        template: NavbarTemplate,

        className: 'navbar navbar-static-top',

        render: function() {
            this.$el.html(this.template({
                pages: this.collection.toJSON()
            }));

            return this;
        }

    });

    return NavbarView;
});
