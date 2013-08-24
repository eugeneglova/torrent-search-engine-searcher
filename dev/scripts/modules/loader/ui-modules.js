/*global define*/

define([
    'modules/ui/engines/index',
    'modules/ui/search/index',
    'modules/ui/iframe/index'
], function (
    Engines,
    Search,
    Iframe
) {
    'use strict';

    var UiModules = {
        search: Search,
        engines: Engines,
        iframe: Iframe
    };

    return UiModules;
});
