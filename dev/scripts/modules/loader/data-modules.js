/*global define*/

define([
    'modules/data/engines/index',
    'modules/data/pages/index',
    'modules/data/state/index'
], function (
    Engines,
    Pages,
    State
) {
    'use strict';

    var DataModules = {
        engines: Engines,
        pages: Pages,
        state: State
    };

    return DataModules;
});
