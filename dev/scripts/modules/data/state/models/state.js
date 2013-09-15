/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var StateModel = Model.extend({
        defaults: {
            'query':        null,
            'engine-id':    null,
            'category-id':  null,
            'type':         null,
            'page-id':      null,
            'group-id':     null
        }
    });

    return StateModel;
});
