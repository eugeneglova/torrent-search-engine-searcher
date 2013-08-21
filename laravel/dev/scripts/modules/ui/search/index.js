/*global define*/

define([
    'backbone',
    './views/search'
], function (Backbone, SearchView) {
    'use strict';

    var Search = Backbone.UIController.extend({

        namespace: 'ui:search',

        listeners: {
            'data:engines:ready': 'render'
        },

        el: null,

        views: null,

        initialize: function() {
            this.el = $('.search');

            this.views = {};

            this.views.search = new SearchView();

            return this;
        },

        render: function() {
            this.views.search.render();

            this.el.append(this.views.search.$el);

            return this;
        }

    });

    return Search;
});
