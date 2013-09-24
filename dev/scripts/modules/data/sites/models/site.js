/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var SiteModel = Model.extend({

        idAttribute: 'site_id',

        parse: function(response) {
            response.name_stripped = response.name.replace(/(<([^>]+)>)/ig, '');
            response.slug = response.name.replace(/(<([^>]+)>)/ig, '').replace(/\s+/, '-').replace(/[^\w-]/g, '').toLowerCase();
            response.foundation_date = response.foundation_date === '0000-00-00' ? null : response.foundation_date;

            return response;
        }

    });

    return SiteModel;
});
