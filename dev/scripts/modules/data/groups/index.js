/*global define*/

define([
    'components/data-remote-collection/index',
    './collections/groups'
], function (DataRemoteCollection, GroupsCollection) {
    'use strict';

    var Groups = DataRemoteCollection.extend({

        namespace: 'data:groups',

        remote_collection_constructor: GroupsCollection

    });

    return Groups;
});
