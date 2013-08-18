/*global define*/

define([
    'backbone-original',
    'core/module'
], function (Backbone, Module) {
    'use strict';

    Backbone.Module = Module;

    return Backbone;
});
