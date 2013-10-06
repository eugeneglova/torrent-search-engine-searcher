/*global define*/

define([
    'underscore',
    'backbone',
    'moment',
    'hbs!../templates/item'
], function (_, Backbone, moment, ItemTemplate) {
    'use strict';

    var ItemView = Backbone.View.extend({

        template: ItemTemplate,

        tagName: 'li',

        events: {
            'click': 'onClick'
        },

        // Reference to parent view
        parent: null,

        initialize: function(options) {
            this.parent = options.parent;

            this.engine = options.engine;

            return this;
        },

        render: function() {
            this.$el.html(this.template(_.extend(this.model.toJSON(), {
                engine: this.engine.toJSON(),
                from_now: moment(this.model.get('created_at')).from(this.model.get('now'))
            })));

            return this;
        },

        onClick: function(e) {
            e.preventDefault();

            this.parent.trigger('open-engine-by-id', this.model.id);

            return true;
        }

    });

    return ItemView;
});
