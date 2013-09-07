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

    Route::resource('available-engines', 'AvailableEngineController');

    Route::resource('engines.categories', 'CategoryController');

    Route::resource('pages', 'PageController');

    Route::resource('contact', 'ContactController');
});

// Get environment name
$environment = strstr($_SERVER['HTTP_HOST'], 'dev.') ? 'dev' : 'prd';

// Get file path based on environment
$index_file = __DIR__ . '/../../' . $environment . '/index.html';

// Push state urls support
Route::get('page/{page}', function() use ($index_file)
{
    readfile($index_file);
});

Route::get('engine/{engine}', function() use ($index_file)
{
    readfile($index_file);
});

Route::get('engine/{engine}/search/{query}', function() use ($index_file)
{
    readfile($index_file);
});

Route::get('engine/{engine}/search/{query}/category/{category}', function() use ($index_file)
{
    readfile($index_file);
});
