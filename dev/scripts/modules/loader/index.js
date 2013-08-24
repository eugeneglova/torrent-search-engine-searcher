/*global define*/

define([
    './service-modules',
    './ui-modules',
    './data-modules'
], function (
    Service,
    UI,
    Data
) {
    'use strict';

    var Loader = {
        definitions: {
            service: Service,
            ui: UI,
            data: Data
        }
    };

    return Loader;
});
