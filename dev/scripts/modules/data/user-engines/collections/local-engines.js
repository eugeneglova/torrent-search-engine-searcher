/*global define*/

define([
    './remote-engines'
], function (RemoteEnginesCollection) {
    'use strict';

    var LocalEnginesCollection = RemoteEnginesCollection.extend({

    });

    return LocalEnginesCollection;
});
