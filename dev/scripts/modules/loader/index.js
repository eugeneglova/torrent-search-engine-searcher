/*global define*/

define([
    'backbone',

    // Service
    'modules/service/log/index',
    'modules/service/analytics/index',
    'modules/service/contact/index',
    'modules/service/search-log/index',

    // UI
    'modules/ui/window/index',
    'modules/ui/user-engines/index',
    'modules/ui/categories/index',
    'modules/ui/search/index',
    'modules/ui/iframe/index',
    'modules/ui/page/index',
    'modules/ui/pages/index',
    // 'modules/ui/groups/index',
    'modules/ui/routes/index',
    'modules/ui/head/index',
    'modules/ui/addthis/index',
    'modules/ui/engines/index',
    'modules/ui/sites/index',
    'modules/ui/site/index',
    'modules/ui/navbar/index',
    'modules/ui/recent-searches/index',

    // Data
    'modules/data/engines/index',
    'modules/data/sites/index',
    'modules/data/user-engines/index',
    'modules/data/categories/index',
    'modules/data/pages/index',
    'modules/data/state/index',
    'modules/data/settings/index',
    'modules/data/groups/index',
    'modules/data/recent-searches/index'
], function (
    Backbone,

    // Service
    Log,
    Analytics,
    Contact,
    SearchLog,

    // UI
    Window,
    UserEngines,
    Categories,
    Search,
    Iframe,
    Page,
    Pages,
    // Groups,
    Routes,
    Head,
    AddThis,
    Engines,
    Sites,
    Site,
    Navbar,
    RecentSearches,

    // Data
    DataEngines,
    DataSites,
    DataUserEngines,
    DataCategories,
    DataPages,
    DataState,
    DataSettings,
    DataGroups,
    DataRecentSearches
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
                contact:    Contact,
                search_log: SearchLog
            };

            this.definitions.ui = {
                window:             Window,
                user_engines:       UserEngines,
                categories:         Categories,
                search:             Search,
                iframe:             Iframe,
                page:               Page,
                navbar:             Navbar,
                pages:              Pages,
                // groups:          Groups,
                routes:             Routes,
                head:               Head,
                addthis:            AddThis,
                engines:            Engines,
                sites:              Sites,
                site:               Site,
                recent_searches:    RecentSearches
            };

            this.definitions.data = {
                engines:            DataEngines,
                sites:              DataSites,
                user_engines:       DataUserEngines,
                categories:         DataCategories,
                pages:              DataPages,
                state:              DataState,
                settings:           DataSettings,
                groups:             DataGroups,
                recent_searches:    DataRecentSearches
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
