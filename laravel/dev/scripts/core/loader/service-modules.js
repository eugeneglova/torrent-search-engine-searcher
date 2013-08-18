/*global define*/

define([
    'modules/service/log/index'
], function (
    Log
) {
    'use strict';

    var ServiceModules = {
        log: Log
    };

    return ServiceModules;
});