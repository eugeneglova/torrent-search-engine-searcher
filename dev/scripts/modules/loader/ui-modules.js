/*global define*/

define([
    'modules/ui/engines/index',
    'modules/ui/search/index',
    'modules/ui/iframe/index',
    'modules/ui/page/index',
    'modules/ui/navbar/index'
], function (
    Engines,
    Search,
    Iframe,
    Page,
    Navbar
) {
    'use strict';

    var UiModules = {
        navbar: Navbar,
        search: Search,
        engines: Engines,
        iframe: Iframe,
        page: Page
    };

    return UiModules;
});
