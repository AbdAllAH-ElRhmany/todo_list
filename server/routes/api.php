<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class);
//Route::post('categories/{category}/restore', [\App\Http\Controllers\Api\CategoryController::class, 'restore']);
//
//Route::apiResource('tasks', \App\Http\Controllers\Api\TaskController::class);
//Route::post('tasks/{task}/restore', [\App\Http\Controllers\Api\TaskController::class, 'restore']);

$api = app(\Illuminate\Routing\Router::class);
$api->group(['namespace' => 'App\Http\Controllers\Api', 'prefix' => 'tasks'], function () use ($api) {
    $api->get('/', 'TaskController@index');
    $api->get('/{id}', 'TaskController@show');
    $api->post('/', 'TaskController@store');
    $api->put('/{id}', 'TaskController@update');
    $api->delete('/{id}', 'TaskController@destroy');
    $api->post('/{id}/restore', 'TaskController@restore');
    $api->post('/pagination/{type}/{field}/{offset}/{limit}', 'TaskController@pagination');
});
$api->group(['namespace' => 'App\Http\Controllers\Api', 'prefix' => 'categories'], function () use ($api) {
    $api->get('/', 'CategoryController@index');
    $api->get('/{id}', 'CategoryController@show');
    $api->post('/', 'CategoryController@store');
    $api->put('/{id}', 'CategoryController@update');
    $api->delete('/{id}', 'CategoryController@destroy');
    $api->post('/{id}/restore', 'CategoryController@restore');
});
