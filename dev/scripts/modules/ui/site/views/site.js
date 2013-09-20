/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/site',
], function ($, _, Backbone, SiteTemplate) {
    'use strict';

    var SiteView = Backbone.View.extend({

        template: SiteTemplate,

        className: 'site',

        // Reference to the site model
        site: null,

        // Reference to the group model
        group: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setSite: function(site) {
            this.site = site;

            return true;
        },

        setGroup: function(group) {
            this.group = group;

            return true;
        },

        resize: function() {
            this.$el.css('height', $(window).height() - $('.header').height());

            return true;
        },

        render: function() {
            this.clearViews();

            this.resize();

            this.$el.html(this.template(_.extend({}, this.site.toJSON(), {
                group: this.group.toJSON()
            })));

            return this;
        },

        clearViews: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
                delete this.views[key];
            }, this);

            return true;
        }

    });

    return SiteView;
});
