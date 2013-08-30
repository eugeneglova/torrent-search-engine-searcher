/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var EngineModel = Model.extend({

        parse: function(response) {
            response.name_stripped = response.name.replace(/(<([^>]+)>)/ig, '');
            response.slug = response.name.replace(/(<([^>]+)>)/ig, '').replace(/\s+/, '-').replace(/[^\w-]/g, '').toLowerCase();
            response.head_title = response.name_stripped + ' BitTorrent Search - TorrentScan';
            response.head_description = 'Search for torrents with ' + response.name_stripped + ' and Torrent Scan engine searcher.';

            return response;
        }

    });

    return EngineModel;
});
