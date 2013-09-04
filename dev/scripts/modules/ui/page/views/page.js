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

        events: {
            'click .submit': 'onSubmit'
        },

        ui: null,

        // Reference to the page model
        model: null,

        initialize: function() {
            this.ui = {
                window: $(window),
                header: $('.header')
            };

            return this;
        },

        setModel: function(model) {
            this.model = model;

            return true;
        },

        onSubmit: function(e) {
            e.preventDefault();

            this.trigger('submit-contact-page', {
                firstname:  this.$('.firstname').val(),
                lastname:   this.$('.lastname').val(),
                email:      this.$('.email').val(),
                subject:    this.$('.subject').val(),
                message:    this.$('.message').val()
            });

            return true;
        },

        prepareResize: function() {
            this.ui.window.on('resize', this.resize.bind(this));

            return true;
        },

        resize: function() {
            this.$el.css('height', this.ui.window.height() - this.ui.header.height());

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
