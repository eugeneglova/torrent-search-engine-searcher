/*global define*/

define([
    'modules/service/log/index',
    'modules/service/analytics/index'
], function (
    Log,
    Analytics
) {
    'use strict';

    var ServiceModules = {
        log: Log,
        analytics: Analytics
    };

    return ServiceModules;
});
