/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var EngineModel = Model.extend({

        parse: function(response) {
            response.name_stripped = response.name.replace(/(<([^>]+)>)/ig, '');

            return response;
        }

    });

    return EngineModel;
});
