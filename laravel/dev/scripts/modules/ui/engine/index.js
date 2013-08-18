/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!./templates/index'
], function ($, _, Backbone, Template) {
    'use strict';
 
    var EngineView = Backbone.View.extend({
        template: Template,

        initialize: function() {
        	return this;
        },


        render: function() {
			return this;        	
        }

    });

    return EngineView;
});