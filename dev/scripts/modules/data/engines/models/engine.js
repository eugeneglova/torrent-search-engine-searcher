/*global define*/

define([
    'models/index'
], function (Model) {
    'use strict';

    var EngineModel = Model.extend({

        parse: function(response) {
            response.name_stripped = response.name.replace(/(<([^>]+)>)/ig, '');
            response.slug = response.name.replace(/(<([^>]+)>)/ig, '').replace(/\s+/, '-').replace(/[^\w-]/g, '').toLowerCase();
            response.title = response.name_stripped + ' BitTorrent Search - TorrentScan';
            response.description = 'Search for torrents with ' + response.name_stripped + ' and Torrent Scan meta engine searcher.';

            return response;
        }

    });

    return EngineModel;
});
