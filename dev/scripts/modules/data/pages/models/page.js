/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var PageModel = Model.extend({

        parse: function(response) {
            response.slug = response.name.replace(/(<([^>]+)>)/ig, '').replace(/\s+/, '-').replace(/[^\w-]/g, '').toLowerCase();
            response.is_home_page = response.name === 'Home';

            return response;
        }

    });

    return PageModel;
});
