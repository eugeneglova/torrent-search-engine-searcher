/*global define*/

define([
    './item'
], function (ItemView) {
    'use strict';

    var BrandItemView = ItemView.extend({

        tagName: 'a',

        className: 'brand',

        render: function() {
            this.$el.attr('href', '/');

            this.$el.html('Torrent Engine Searcher');

            return this;
        }

    });

    return BrandItemView;
});
