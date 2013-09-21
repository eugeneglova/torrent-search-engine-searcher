/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var CategoryModel = Model.extend({

        parse: function(response) {
            response.slug = response.name.replace(/(<([^>]+)>)/ig, '').replace(/\s+/, '-').replace(/[^\w-]/g, '').toLowerCase();

            return response;
        }

    });

    return CategoryModel;
});
