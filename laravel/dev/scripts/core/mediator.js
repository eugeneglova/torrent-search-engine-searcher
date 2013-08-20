/*global define*/

define([
    'underscore',
    'backbone-original'
], function (_, Backbone) {
    'use strict';

    var Mediator = _.extend({}, Backbone.Events);

    return Mediator;
});
