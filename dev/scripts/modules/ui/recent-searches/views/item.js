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

            this.parent.trigger('search', {
                query:      this.model.get('query'),
                engine_id:  this.model.get('engine_id')
            });

            return true;
        }

    });

    return ItemView;
});
