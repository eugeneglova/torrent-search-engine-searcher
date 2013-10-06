/*global define*/

define([
    'components/data-remote-collection/index',
    './collections/pages'
], function (DataRemoteCollection, PagesCollection) {
    'use strict';

    var Pages = DataRemoteCollection.extend({

        namespace: 'data:pages',

        remote_collection_constructor: PagesCollection

    });

    return Pages;
});
