/*global define*/

define([
    'bootstrap',
    './item',
    'hbs!../templates/engines-item'
], function ($, ItemView, EnginesItemTemplate) {
    'use strict';

    var EnginesItemView = ItemView.extend({

        template: EnginesItemTemplate,

        events: {
            'click a': 'onClick'
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        onClick: function(e) {
            e.preventDefault();

            this.parent.trigger('open-engines');

            return true;
        }

    });

    return EnginesItemView;
});
