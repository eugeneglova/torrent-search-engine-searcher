/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var SearchModel = Model.extend({

        url: '/api/v1/search-log'

    });

    return SearchModel;
});
