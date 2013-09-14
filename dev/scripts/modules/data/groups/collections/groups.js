/*global define*/

define([
    'backbone',
    '../models/group'
], function (Backbone, GroupModel) {
    'use strict';

    var GroupsCollection = Backbone.Collection.extend({

        model: GroupModel,

        url: '/api/v1/groups',

        comparator: function(model) {
            return model.get('sort');
        }

    });

    return GroupsCollection;
});
