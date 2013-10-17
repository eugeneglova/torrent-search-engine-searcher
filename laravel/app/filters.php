<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	//
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (Auth::guest()) return Redirect::guest('login');
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});

/*
|--------------------------------------------------------------------------
| Browser Filter
|--------------------------------------------------------------------------
|
| The Browser filter is responsible for detection browser
| and use phantomjs to render site for search engine bots.
|
*/

Route::filter('browser', function()
{

    $searchengines = array(
        'Googlebot',
        'YandexBot',
        'AdsBot-Google',
        'bingbot',
        'AltaVista',
        'Slurp',
        'AhrefsBot',
        'Teoma',
        'search.msn.com',
        'nutch',
        'simpy',
        'bot',
        'ASPSeek',
        'crawler',
        'msnbot',
        'Libwww-perl',
        'FAST',
        'Baidu',
    );

    $is_se = false;

    if (false === strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'phantom')) {
        foreach ($searchengines as $searchengine) {
           if (false !== strpos(strtolower($_SERVER['HTTP_USER_AGENT']), strtolower($searchengine))) {
                $is_se = true;
                break;
            }
        }
    }

    if ($is_se) {
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
        die;
    }
});
