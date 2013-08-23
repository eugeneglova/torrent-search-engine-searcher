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
        engines: Engines,
        search: Search,
        iframe: Iframe
    };

    return UiModules;
});
