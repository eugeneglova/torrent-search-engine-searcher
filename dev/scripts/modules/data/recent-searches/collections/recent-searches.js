/*global define*/

define([
    'backbone',
    '../models/recent-search'
], function (Backbone, RecentSearchModel) {
    'use strict';

    var RecentSearchesCollection = Backbone.Collection.extend({

        model: RecentSearchModel,

        url: '/api/v1/search-log?show=recent'

    });

    return RecentSearchesCollection;
});
