/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var SearchModel = Model.extend({
        defaults: {
            query:          null,
            'engine-id':    null
        }
    });

    return SearchModel;
});
