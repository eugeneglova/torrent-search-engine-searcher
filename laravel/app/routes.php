<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
    return View::make('hello');
});

// Route group for API versioning
Route::group(array('prefix' => 'api/v1'), function()
{
    Route::resource('engines', 'EngineController');

    Route::resource('pages', 'PageController');
});

// Push state urls support
Route::get('{path1}/{path2}', function($path1, $path2)
{
    // Get environment name
    $environment = strstr($_SERVER['HTTP_HOST'], 'dev.') ? 'dev' : 'prd';

    // Get file path based on environment
    $index_file = __DIR__ . '/../../' . $environment . '/index.html';

    readfile($index_file);
});
