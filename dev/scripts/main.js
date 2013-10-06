/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        'backbone-original': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'jquery.ui.widget': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'jquery.ui.mouse': {
            deps: ['jquery.ui.widget'],
            exports: 'jQuery'
        },
        'jquery.ui.draggable': {
            deps: ['jquery.ui.core', 'jquery.ui.mouse'],
            exports: 'jQuery'
        },
        'jquery.ui.droppable': {
            deps: ['jquery.ui.draggable'],
            exports: 'jQuery'
        },
        'jquery.ui.sortable': {
            deps: ['jquery.ui.droppable'],
            exports: 'jQuery'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    },
    // hbs plugin settings, listing here just as a reference
    hbs : {
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n : true
    },
    paths: {
        jquery:                 '../bower_components/jquery/jquery',
        // jQuery UI
        'jquery.ui.core':       '../bower_components/jquery-ui/ui/jquery.ui.core',
        'jquery.ui.widget':     '../bower_components/jquery-ui/ui/jquery.ui.widget',
        'jquery.ui.mouse':      '../bower_components/jquery-ui/ui/jquery.ui.mouse',
        'jquery.ui.draggable':  '../bower_components/jquery-ui/ui/jquery.ui.draggable',
        'jquery.ui.droppable':  '../bower_components/jquery-ui/ui/jquery.ui.droppable',
        'jquery.ui.sortable':   '../bower_components/jquery-ui/ui/jquery.ui.sortable',
        // Backbone
        'backbone-original':    '../bower_components/backbone/backbone',
        localstorage:           '../bower_components/backbone.localStorage/backbone.localStorage',
        backbone:               'core/backbone',
        underscore:             '../bower_components/underscore/underscore',
        moment:                '../bower_components/momentjs/moment',
        bootstrap:              'vendor/bootstrap',
        // require-handlebars-plugin setup
        'handlebars':           '../bower_components/require-handlebars-plugin/Handlebars',
        'hbs':                  '../bower_components/require-handlebars-plugin/hbs',
        'i18nprecompile':       '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        'json2':                '../bower_components/require-handlebars-plugin/hbs/json2'
    },
    urlArgs: 'bust=' +  (new Date()).getTime()
});

require([
    'core/app'
], function (App) {
    window.app = new App();
});
