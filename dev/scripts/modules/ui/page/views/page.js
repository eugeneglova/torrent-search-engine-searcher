/*global define*/

define([
    'jquery',
    'backbone',
    'hbs!../templates/page'
], function ($, Backbone, PageTemplate) {
    'use strict';

    var PageView = Backbone.View.extend({

        template: PageTemplate,

        className: 'page',

        ui: null,

        // Reference to the page model
        model: null,

        initialize: function() {
            this.ui = {
                window: $(window),
                navbar: null,
                search: null
            };

            return this;
        },

        setModel: function(model) {
            this.model = model;

            return true;
        },

        prepareResize: function() {
            if (!this.ui.navbar || !this.ui.navbar.length) {
                this.ui.navbar = $('.navbar');
            }

            if (!this.ui.search || !this.ui.search.length) {
                this.ui.search = $('.search');
            }

            this.ui.window.on('resize', this.resize.bind(this));

            return true;
        },

        resize: function() {
            this.$el.css('height', this.ui.window.height() - this.ui.navbar.height());

            return true;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            this.prepareResize();

            this.resize();

            return this;
        }

    });

    return PageView;
});
