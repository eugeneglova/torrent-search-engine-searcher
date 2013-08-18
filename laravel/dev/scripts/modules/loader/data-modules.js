/*global define*/

define([
    'modules/data/engines/index'
], function (
    Engines
) {
    'use strict';

    var DataModules = {
        engines: Engines
    };

    return DataModules;
});