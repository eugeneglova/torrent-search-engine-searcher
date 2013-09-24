/*global define*/

define([
    'underscore',
    './remote-engines',
    'components/data-collection/collections/local'
], function (_, RemoteEnginesCollection, LocalCollection) {
    'use strict';

    var LocalEnginesCollection = RemoteEnginesCollection.extend(_.omit(_.extend({}, LocalCollection.prototype, {

    }), 'model'));

    return LocalEnginesCollection;
});
