/*global define*/

define([
    'underscore',
    './remote-engines',
    'localstorage'
], function (_, EnginesCollection, LocalStorage) {
    'use strict';

    var LocalEnginesCollection = EnginesCollection.extend({

        localStorage: new LocalStorage('data:engines:all'),

        save: function() {
            _.invoke(this.toArray(), 'save');

            return true;
        },

        clear: function() {
            this.localStorage._clear();

            return true;
        }

    });

    return LocalEnginesCollection;
});
