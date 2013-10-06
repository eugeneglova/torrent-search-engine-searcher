/*global define*/

define([
    'backbone',
    '../models/recent-search'
], function (Backbone, RecentSearchesModel) {
    'use strict';

    var RecentSearchesCollection = Backbone.Collection.extend({

        model: RecentSearchesModel,

        url: '/api/v1/search-log?show=recent'

    });

    return RecentSearchesCollection;
});
