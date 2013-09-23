/*global define*/

define([
    'backbone',
    './views/iframe'
], function (Backbone, IframeView) {
    'use strict';

    var Iframe = Backbone.UIController.extend({

        namespace: 'ui:iframe',

        listeners: {
            ':open':                'onOpen',
            'data:engines:ready':   'onDataEnginesReady',
            'ui:window:resized':    'onWindowResized',
            'ui:page:open':         'remove',
            'ui:engines:open':      'remove',
            'ui:sites:open':        'remove',
            'ui:site:open':         'remove'
        },

        el: null,

        views: null,

        engine: null,

        query: null,

        type: null,

        category: null,

        // Reference to the engines collection
        engines: null,

        // Reference to the user engines collection
        user_engines: null,

        // Reference to the categories collection
        categories: null,

        initialize: function() {
            this.el = $('.content');

            this.views = {};

            this.views.iframe = new IframeView();

            return this;
        },

        onDataEnginesReady: function() {
            this.request('data:engines:get', this.onDataEnginesGetLocal, this);

            this.request('data:user-engines:get', this.onDataUserEnginesGet, this);

            return true;
        },

        onDataEnginesGetLocal: function(engines) {
            this.engines = engines;

            return true;
        },

        onDataUserEnginesGet: function(engines) {
            this.user_engines = engines;

            return true;
        },

        onOpen: function() {
            this.request('data:state:get', 'engine-id', this.onGetEngineId, this);

            return true;
        },

        onGetEngineId: function(engine_id) {
            this.engine = this.engines.get(engine_id);

            if (!this.engine) {
                // Use first engine from user engines collection to search on
                // when there is no engine selected
                this.engine = this.user_engines.first();

                this.request('data:state:set', 'engine-id', this.engine.id);
            }

            this.views.iframe.setEngine(this.engine);

            this.request('data:state:get', 'type', this.onGetType, this);

            return true;
        },

        onGetType: function(type) {
            this.type = type;

            this.views.iframe.setType(this.type);

            if (this.type === 'home') {
                this.render();

                this.request('ui:routes:set', 'engine/' + this.engine.get('slug'));

                this.request('ui:head:set', {
                    title:          this.engine.get('name_stripped') + ' BitTorrent Search - TorrentScan',
                    description:    'Search for torrents with ' + this.engine.get('name_stripped') + ' and Torrent Scan engine searcher.'
                });

                this.request('service:analytics:event', 'iframe', type, this.engine.get('name_stripped'));
            } else if (this.type === 'search') {
                this.request('data:state:get', 'query', this.onGetQuery, this);
            }

            return true;
        },

        onGetQuery: function(query) {
            this.query = query;

            this.views.iframe.setQuery(this.query);

            this.request('data:categories:get', this.onDataCategoriesGet, this);

            return true;
        },

        onDataCategoriesGet: function(categories) {
            this.categories = categories;

            this.request('data:state:get', 'category-id', this.onGetCategoryId, this);

            return true;
        },

        onGetCategoryId: function(category_id) {
            var route;

            this.category = this.categories.get(category_id);

            this.views.iframe.setCategory(this.category);

            this.render();

            route = 'engine/' + this.engine.get('slug') + '/search/' + this.query;

            if (this.category) {
                route += '/category/' + this.category.get('slug');
            }

            this.request('ui:routes:set', route);

            if (this.category) {
                this.request('ui:head:set', {
                    title:          this.category.get('name') + ' torrent ' + this.query + ' ' + this.engine.get('name_stripped') + ' Search - TorrentScan',
                    description:    'Search results for ' + this.query + ' torrent within ' + this.category.get('name') + ' on ' + this.engine.get('name_stripped') + ' and Torrent Scan engine searcher.'
                });
            } else {
                this.request('ui:head:set', {
                    title:          'Torrent ' + this.query + ' ' + this.engine.get('name_stripped') + ' Search - TorrentScan',
                    description:    'Search results for ' + this.query + ' on ' + this.engine.get('name_stripped') + ' and Torrent Scan engine searcher.'
                });
            }

            this.request('service:analytics:event', 'iframe', this.type, this.engine.get('name_stripped'));

            this.request('service:analytics:event', 'iframe', 'query', this.query);

            if (this.category) {
                this.request('service:analytics:event', 'iframe', 'category', this.category.get('name'));
            }

            return true;
        },

        onWindowResized: function() {
            if (!this.views.iframe) return false;

            this.views.iframe.resize();

            return true;
        },

        render: function() {
            this.views.iframe.render();

            this.el.append(this.views.iframe.$el);

            this.announce('opened');

            return this;
        },

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            return true;
        }

    });

    return Iframe;
});
