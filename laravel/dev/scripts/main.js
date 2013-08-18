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
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    // hbs plugin settings, listing here just as a reference
    hbs : {
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n : true
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        'backbone-original': '../bower_components/backbone/backbone',
        backbone: 'core/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        // require-handlebars-plugin setup
        'handlebars' : '../bower_components/require-handlebars-plugin/Handlebars',
        'hbs': '../bower_components/require-handlebars-plugin/hbs',
        'i18nprecompile' : '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        'json2' : '../bower_components/require-handlebars-plugin/hbs/json2'
    }
});

require([
    'backbone',
    'core/app',
    'core/mediator'
], function (Backbone, App, Mediator) {
    window.app = new App({
        mediator: Mediator
    });
    Backbone.history.start();
});
