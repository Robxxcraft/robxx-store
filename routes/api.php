<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/category', [CategoryController::class, 'index']);
Route::post('/category/add', [CategoryController::class, 'create']);
Route::get('/category/{id}', [CategoryController::class, 'edit']);
Route::put('/category/{id}', [CategoryController::class, 'update']);
Route::delete('/category/{id}', [CategoryController::class, 'delete']);

Route::get('/product', [ProductController::class, 'index']);
Route::post('/product/add', [ProductController::class, 'create']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::put('/product/{id}', [ProductController::class, 'update']);
Route::delete('/product/{id}', [ProductController::class, 'delete']);

Route::post('/register', [\App\Http\Controllers\AuthController::class,'register']);