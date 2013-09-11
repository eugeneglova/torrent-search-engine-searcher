/*global define*/

define([
    'backbone',

    // Service
    'modules/service/log/index',
    'modules/service/analytics/index',
    'modules/service/contact/index',

    // UI
    'modules/ui/window/index',
    'modules/ui/user-engines/index',
    'modules/ui/categories/index',
    'modules/ui/search/index',
    'modules/ui/iframe/index',
    'modules/ui/page/index',
    'modules/ui/pages/index',
    'modules/ui/routes/index',
    'modules/ui/head/index',
    'modules/ui/addthis/index',
    'modules/ui/available-engines/index',

    // Data
    'modules/data/engines/index',
    'modules/data/categories/index',
    'modules/data/pages/index',
    'modules/data/state/index',
    'modules/data/settings/index'
], function (
    Backbone,

    // Service
    Log,
    Analytics,
    Contact,

    // UI
    Window,
    UserEngines,
    Categories,
    Search,
    Iframe,
    Page,
    Pages,
    Routes,
    Head,
    AddThis,
    AvailableEngines,

    // Data
    DataEngines,
    DataCategories,
    DataPages,
    DataState,
    DataSettings
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
                analytics:  Analytics,
                contact:    Contact
            };

            this.definitions.ui = {
                window:             Window,
                user_engines:       UserEngines,
                categories:         Categories,
                search:             Search,
                iframe:             Iframe,
                page:               Page,
                pages:              Pages,
                routes:             Routes,
                head:               Head,
                addthis:            AddThis,
                availableengines:   AvailableEngines
            };

            this.definitions.data = {
                engines:    DataEngines,
                categories: DataCategories,
                pages:      DataPages,
                state:      DataState,
                setting:    DataSettings
            };

            this.modules            = {};
            this.modules.service    = {};
            this.modules.ui         = {};
            this.modules.data       = {};

            // Listen to ready event of each data module
            Object.keys(this.definitions.data).forEach(function(module) {
                this.listenToOnce(this.mediator, this.definitions.data[module].prototype.namespace + ':ready', this.onDataModuleReady, this);
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

            if (Object.keys(this.definitions.data).length === this.data_loaded_count) {
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
