/*global define*/

define([
    'modules/ui/engines/index',
    'modules/ui/search/index'
], function (
    Engines,
    Search
) {
    'use strict';

    var UiModules = {
        engines: Engines,
        search: Search
    };

    return UiModules;
});
