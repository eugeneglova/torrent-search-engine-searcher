/*global define*/

define([
    'backbone',

    // Service
    'modules/service/log/index',
    'modules/service/analytics/index',

    // UI
    'modules/ui/engines/index',
    'modules/ui/search/index',
    'modules/ui/iframe/index',
    'modules/ui/page/index',
    'modules/ui/navbar/index',
    'modules/ui/routes/index',

    // Data
    'modules/data/engines/index',
    'modules/data/pages/index',
    'modules/data/state/index'
], function (
    Backbone,

    // Service
    Log,
    Analytics,

    // UI
    Engines,
    Search,
    Iframe,
    Page,
    Navbar,
    Routes,

    // Data
    DataEngines,
    DataPages,
    DataState
) {
    'use strict';

    var Loader = Backbone.Controller.extend({

        namespace: 'app:loader',

        // Reference to module definitions
        definitions: null,

        // Reference to loaded modules
        modules: null,

        data_loaded_count: 0,

        initialize: function() {
            this.definitions = {};

            this.definitions.service = {
                log:        Log,
                analytics:  Analytics
            };

            this.definitions.ui = {
                navbar:     Navbar,
                search:     Search,
                engines:    Engines,
                iframe:     Iframe,
                page:       Page,
                routes:     Routes
            };

            this.definitions.data = {
                engines:    DataEngines,
                pages:      DataPages,
                state:      DataState
            };

            this.modules            = {};
            this.modules.service    = {};
            this.modules.ui         = {};
            this.modules.data       = {};

            // Subscribe to ready event of each data module
            Object.keys(this.definitions.data).forEach(function(module) {
                this.mediator.once(this.definitions.data[module].prototype.namespace + ':ready', this.onDataModuleReady, this);
            }, this);

            // Load all modules
            this.load();

            return this;
        },


        /**
         * Loads modules by its type
         * @param  {string} type can be service, ui or data
         * @return {boolean}
         */
        loadByType: function(type) {
            Object.keys(this.definitions[type]).forEach(function(module) {
                this.modules[type][module] = new this.definitions[type][module]();
            }, this);

            return true;
        },


        /**
         * Loads all modules
         * @return {boolean}
         */
        load: function() {
            this.loadByType('service');

            this.loadByType('ui');

            this.loadByType('data');

            return true;
        },


        /**
         * Callback on each data module ready state
         * to announce event about all async data modules are loaded
         * @return {boolean}
         */
        onDataModuleReady: function() {
            this.data_loaded_count += 1;

            if (Object.keys(this.modules.data).length === this.data_loaded_count) {
                // Move ready event to the end of event loop
                setTimeout(function() {
                    this.announce('ready');
                }.bind(this), 0);
            }

            return true;
        }

    });

    return Loader;
});
