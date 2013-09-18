/*global define*/

define([
    'underscore',
    './remote',
    'localstorage'
], function (_, RemoteCollection, LocalStorage) {
    'use strict';

    var LocalCollection = RemoteCollection.extend({

        localStorage: null,

        initialize: function(models, options) {
            if (!options || !options.local_storage_key) return this;

            this.localStorage = new LocalStorage(options.local_storage_key);

            return this;
        },

        save: function() {
            _.invoke(this.toArray(), 'save');

            return true;
        },

        clear: function() {
            this.localStorage._clear();

            return true;
        }

    });

    return LocalCollection;
});
