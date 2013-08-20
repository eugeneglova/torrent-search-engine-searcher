/*global define*/

define([
    'backbone-original',
    'core/controller',
    'core/ui-controller'
], function (Backbone, Controller, UIController) {
    'use strict';

    Backbone.Controller = Controller;

    Backbone.UIController = UIController;

    return Backbone;
});
