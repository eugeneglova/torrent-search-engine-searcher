/*global define*/

define([
    'components/data-collection/index',
    './collections/remote-engines',
    './collections/local-engines'
], function (DataCollection, RemoteEnginesCollection, LocalEnginesCollection) {
    'use strict';

    var Engines = DataCollection.extend({

        namespace: 'data:engines',

        setting_version_key: 'version_engines',

        local_storage_key: 'engines',

        // Remote collection constructor
        remote_collection_constructor: RemoteEnginesCollection,

        // Local collection constructor
        local_collection_constructor: LocalEnginesCollection

    });

    return Engines;
});
