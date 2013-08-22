/*global define*/

define([
    'modules/data/engines/index',
    'modules/data/search/index'
], function (
    Engines,
    Search
) {
    'use strict';

    var DataModules = {
        engines: Engines,
        search: Search
    };

    return DataModules;
});
