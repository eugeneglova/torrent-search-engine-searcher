/*global define*/

define([
    'backbone',
    'hbs!../templates/addthis'
], function (Backbone, AddThisTemplate) {
    'use strict';

    var AddThisView = Backbone.View.extend({

        template: AddThisTemplate,

        className: 'addthis',

        render: function() {
            this.$el.html(this.template());

            return this;
        }

    });

    return AddThisView;
});
