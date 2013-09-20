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
    Route::resource('settings', 'SettingController');

    Route::resource('groups', 'GroupController');

    Route::resource('groups.sites', 'SiteController');

    Route::resource('sites', 'SiteController');

    Route::resource('engines', 'EngineController');

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
})->where(array('page' => '[a-z-]+'));

Route::get('engine/{engine}', function() use ($index_file)
{
    readfile($index_file);
})->where(array('engine' => '[a-z-]+'));

Route::get('engine/{engine}/search/{query}', function() use ($index_file)
{
    readfile($index_file);
})->where(array('engine' => '[a-z-]+'));

Route::get('engine/{engine}/search/{query}/category/{category}', function() use ($index_file)
{
    readfile($index_file);
})->where(array('engine' => '[a-z-]+', 'category' => '[a-z-]+'));

Route::get('engines', function() use ($index_file)
{
    readfile($index_file);
});

Route::get('engines/{group}', function() use ($index_file)
{
    readfile($index_file);
})->where(array('group' => '[a-z-]+'));

Route::get('sites', function() use ($index_file)
{
    readfile($index_file);
});

Route::get('sites/{group}', function() use ($index_file)
{
    readfile($index_file);
})->where(array('group' => '[a-z-]+'));
