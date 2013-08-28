<?php

// Path to node binary
$node = '/home5/iglovaco/public_html/domains/search/node-v0.10.17-linux-x64/bin/node';

// Path to phantomjs binary
$phantom = '../node_modules/grunt-mocha/node_modules/grunt-lib-phantomjs/node_modules/.bin/phantomjs';

// Path to phantomjs binary
$phantom = '../node_modules/grunt-mocha/node_modules/grunt-lib-phantomjs/node_modules/.bin/phantomjs';

// Path to seoserver phantom server javascript module
$server = '../node_modules/seoserver/lib/phantom-server.js';

$url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

$cmd = $node . ' ' . $phantom . ' ' . $server . ' ' . $url;

echo system($cmd . ' 2> /dev/null');
