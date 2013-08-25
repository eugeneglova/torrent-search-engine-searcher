/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var StateModel = Model.extend({
        defaults: {
            query:          null,
            'engine-id':    null
        }
    });

    return StateModel;
});
