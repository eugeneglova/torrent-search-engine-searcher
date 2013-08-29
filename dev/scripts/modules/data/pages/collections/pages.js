/*global define*/

define([
    'backbone',
    '../models/page'
], function (Backbone, PageModel) {
    'use strict';

    var PagesCollection = Backbone.Collection.extend({

        model: PageModel,

        url: '/api/v1/pages'

    });

    return PagesCollection;
});
