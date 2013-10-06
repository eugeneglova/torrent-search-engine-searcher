/*global define*/

define([
    'backbone',
    '../models/top-search'
], function (Backbone, TopSearchModel) {
    'use strict';

    var TopSearchesCollection = Backbone.Collection.extend({

        model: TopSearchModel,

        url: '/api/v1/search-log?show=top'

    });

    return TopSearchesCollection;
});
