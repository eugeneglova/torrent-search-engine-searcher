<?php

class PhantomController extends BaseController {

    protected function index() {
        $environment = strstr($_SERVER['HTTP_HOST'], 'dev.') ? 'dev' : 'prd';

        // Path to node binary
        $node = '/home5/iglovaco/public_html/domains/search/node-v0.10.17-linux-x64/bin/node';
        if ($environment === 'dev') {
            $node = '/usr/local/bin/node';
        }

        // Path to phantomjs binary
        $phantom = '../node_modules/grunt-mocha/node_modules/grunt-lib-phantomjs/node_modules/.bin/phantomjs';

        // Path to seoserver phantom server javascript module
        $server = 'phantom-server.js';

        // Get user agent string
        $ua = $_SERVER['HTTP_USER_AGENT'];

        $url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        if ($environment === 'dev') {
            $url = 'http://prd.search.local';
        }

        // Get item from DB
        $item = Phantom::where('url', $url)->get();

        if ($item->count() === 0) {
            // Generate cmd line
            $cmd = $node . ' ' . $phantom . ' ' . $server . ' "' . $url . '" "' . $ua . '"';

            // Get content from system and save it to variable
            ob_start();
            system($cmd . ' 2> /dev/null');
            $content = ob_get_clean();
    
            // Fill the model
            $phantom = new Phantom(array(
                'url' => $url,
                'content' => $content
            ));
    
            // Save to DB
            $phantom->save();
        } else {
            $content = $item[0]->content;
        }

        // Output content to the browser
        echo $content;
    }

}
