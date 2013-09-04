/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var ContactModel = Model.extend({

        url: '/api/v1/contact'

    });

    return ContactModel;
});
