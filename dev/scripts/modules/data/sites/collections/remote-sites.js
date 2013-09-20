/*global define*/

define([
    'components/data-collection/collections/remote',
    '../models/site'
], function (RemoteCollection, SiteModel) {
    'use strict';

    var RemoteSitesCollection = RemoteCollection.extend({

        model: SiteModel,

        url: function() {
            if (this.group_id) {
                return '/api/v1/group/' +  this.group_id + '/sites';
            }

            return '/api/v1/sites';
        },

        comparator: function(model) {
            return model.get('sort');
        }

    });

    return RemoteSitesCollection;
});
