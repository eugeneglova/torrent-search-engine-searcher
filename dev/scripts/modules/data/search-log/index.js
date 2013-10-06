/*global define*/

define([
    'components/data-remote-collection/index',
    './collections/search-log'
], function (DataRemoteCollection, SearchLogCollection) {
    'use strict';

    var SearchLog = DataRemoteCollection.extend({

        namespace: 'data:search-log',

        remote_collection_constructor: SearchLogCollection

    });

    return SearchLog;
});
