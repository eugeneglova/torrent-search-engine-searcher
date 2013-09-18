/*global define*/

define([
    'modules/data/engines/collections/local-engines'
], function (LocalEnginesCollection) {
    'use strict';

    var RemoteEnginesCollection = LocalEnginesCollection.extend({

    });

    return RemoteEnginesCollection;
});
