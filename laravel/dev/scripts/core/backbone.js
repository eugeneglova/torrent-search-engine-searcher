/*global define*/

define([
    'backbone-original',
    'core/module',
    'core/ui-module'
], function (Backbone, Module, UIModule) {
    'use strict';

    Backbone.Module = Module;

    Backbone.UIModule = UIModule;

    return Backbone;
});
