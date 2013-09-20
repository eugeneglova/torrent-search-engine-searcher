/*global define*/

define([
    'components/data-collection/index',
    './collections/remote-sites'
], function (DataCollection, RemoteSitesCollection) {
    'use strict';

    var Sites = DataCollection.extend({

        namespace: 'data:sites',

        local_storage_key: null,

        // Remote collection constructor
        remote_collection_constructor: RemoteSitesCollection,

        // Local collection constructor
        local_collection_constructor: RemoteSitesCollection

    });

    return Sites;
});
