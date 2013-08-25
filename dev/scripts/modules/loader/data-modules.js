/*global define*/

define([
    'modules/data/engines/index',
    'modules/data/pages/index',
    'modules/data/search/index'
], function (
    Engines,
    Pages,
    Search
) {
    'use strict';

    var DataModules = {
        engines: Engines,
        pages: Pages,
        search: Search
    };

    return DataModules;
});
