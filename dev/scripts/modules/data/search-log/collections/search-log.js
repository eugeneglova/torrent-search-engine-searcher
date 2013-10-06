/*global define*/

define([
    'backbone',
    '../models/search-log'
], function (Backbone, SearchLogModel) {
    'use strict';

    var SearchLogCollection = Backbone.Collection.extend({

        model: SearchLogModel,

        url: '/api/v1/search-log'

    });

    return SearchLogCollection;
});
