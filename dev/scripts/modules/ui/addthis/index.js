/*global define*/

define([
    'backbone',
    './views/addthis'
], function (Backbone, AddThisView) {
    'use strict';

    var AddThis = Backbone.UIController.extend({

        namespace: 'ui:addthis',

        el: null,

        views: null,

        initialize: function() {
            this.el = $('.navigation-top');

            this.views = {};

            this.views.addthis = new AddThisView();

            this.render();

            return this;
        },

        render: function() {
            this.views.addthis.render();

            this.el.append(this.views.addthis.$el);

            return this;
        }

    });

    return AddThis;
});
