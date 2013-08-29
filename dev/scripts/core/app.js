/*global define*/

define([
    'backbone',
    'modules/loader/index'
], function (Backbone, Loader) {
    'use strict';

    var App = Backbone.Controller.extend({

        namespace: 'app',

        loader: null,

        /**
         * Initialize application
         * @return {object} this
         */
        initialize: function() {
            this.loader = new Loader();

            return this;
        }

    });

    return App;
});
