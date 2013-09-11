/*global define*/

define([
    './local-engines',
    'localstorage'
], function (EnginesCollection, LocalStorage) {
    'use strict';

    var UserEnginesCollection = EnginesCollection.extend({

        localStorage: new LocalStorage('user-engines')

    });

    return UserEnginesCollection;
});
