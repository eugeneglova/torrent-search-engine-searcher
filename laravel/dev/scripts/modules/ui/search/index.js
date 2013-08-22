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

            this.listenTo(this.views.search, 'change', this.onChange, this);

            return this;
        },

        render: function() {
            this.views.search.render();

            this.el.append(this.views.search.$el);

            return this;
        },

        onChange: function(value) {
            this.request('data:search:set:query', value);

            return true;
        }

    });

    return Search;
});
