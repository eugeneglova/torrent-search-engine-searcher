/*global define*/

define([
    'underscore',
    'backbone',
    'modules/loader/index'
], function (_, Backbone, Loader) {
    'use strict';

    var App = Backbone.Controller.extend({

        namespace: 'app',

        loader: null,

        // Reference to loaded modules
        modules: null,

        /**
         * Initialize application
         * @return {object} this
         */
        initialize: function() {
            this.loader = Loader;

            this.modules = {
                service: {},
                ui: {},
                data: {}
            };

            // Load all modules
            this.loadModules();

            return this;
        },


        /**
         * Loads modules by its type
         * @param  {string} type can be service, ui or data
         * @return {boolean}
         */
        loadModulesByType: function(type) {
            Object.keys(this.loader.definitions[type]).forEach(function(module) {
                this.modules[type][module] = new this.loader.definitions[type][module]();
            }, this);

            this.announce('modules:load:' + type);

            return true;
        },


        /**
         * Loads all modules
         * @return {boolean}
         */
        loadModules: function() {
            this.loadModulesByType('service');

            this.loadModulesByType('ui');

            this.loadModulesByType('data');

            return true;
        }

    });

    return App;
});
