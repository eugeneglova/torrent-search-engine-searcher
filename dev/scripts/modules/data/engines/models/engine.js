/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var EngineModel = Model.extend({

        parse: function(response) {
            response.name_stripped = response.name.replace(/(<([^>]+)>)/ig, '');
            response.slug = response.name.replace(/(<([^>]+)>)/ig, '').replace(/\s+/, '-').replace(/[^\w-]/g, '').toLowerCase();

            return response;
        }

    });

    return EngineModel;
});
