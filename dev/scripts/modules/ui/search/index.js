/*global define*/

define([
    'backbone',
    './views/search'
], function (Backbone, SearchView) {
    'use strict';

    var Search = Backbone.UIController.extend({

        namespace: 'ui:search',

        listeners: {
            'data:engines:ready':       'render',
            'data:state:changed:query': 'onDateStateChangedQuery'
        },

        el: null,

        views: null,

        initialize: function() {
            this.el = $('.search');

            this.views = {};

            this.views.search = new SearchView();

            this.listenTo(this.views.search, 'change', this.onChange, this);
            this.listenTo(this.views.search, 'submit', this.onSubmit, this);

            return this;
        },

        onDateStateChangedQuery: function() {
            this.request('data:state:get:query', this.onGetQuery, this);

            return true;
        },

        onGetQuery: function(query) {
            this.views.search.setQuery(query);

            this.render();

            return true;
        },

        render: function() {
            this.views.search.render();

            this.el.append(this.views.search.$el);

            return this;
        },

        onChange: function(value) {
            this.request('data:state:set:query', value);

            return true;
        },

        onSubmit: function(value) {
            this.onChange(value);

            this.request('ui:iframe:open');

            return true;
        }

    });

    return Search;
});
