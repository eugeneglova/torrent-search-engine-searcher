/*global define*/

define([
    'jquery',
    'backbone',
    'hbs!../templates/page',
    'hbs!templates/ads/banner'
], function ($, Backbone, PageTemplate, BannerTemplate) {
    'use strict';

    var PageView = Backbone.View.extend({

        template: PageTemplate,

        className: 'page',

        events: {
            'click .submit': 'onSubmit'
        },

        // Reference to the page model
        model: null,

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

        resize: function() {
            this.$el.css('height', $(window).height() - $('.header').outerHeight(true));

            return true;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON(), {
                partials: {
                    templates_ads_banner: BannerTemplate
                }
            }));

            this.resize();

            return this;
        }

    });

    return PageView;
});
