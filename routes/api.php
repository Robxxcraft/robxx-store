<?php


use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavouriteController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request)  {
    return $request->user()->load('details');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/category/add', [CategoryController::class, 'create']);
    Route::get('/category/{id}', [CategoryController::class, 'edit']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/{id}', [CategoryController::class, 'delete']);


    Route::get('/product', [ProductController::class, 'index']);
    Route::post('/product/add', [ProductController::class, 'create']);
    Route::put('/product/{id}', [ProductController::class, 'update']);
    Route::delete('/product/{id}', [ProductController::class, 'delete']);


    Route::get('/tags', [TagController::class, 'index']);
    Route::post('/tag/add', [TagController::class, 'create']);
    Route::get('/tag/{id}', [TagController::class, 'show']);
    Route::put('/tag/{id}', [TagController::class, 'update']);
    Route::delete('/tag/{id}', [TagController::class, 'delete']);

    Route::put('/update-user', [AuthController::class, 'update']);
});

Route::get('/cart', [CartController::class,'index']);
Route::get('/cart_page', [CartController::class,'cart_page']);
Route::post('/cart', [CartController::class,'store']);
Route::delete('/cart/{productId}', [CartController::class,'destroy']);
Route::delete('/cart', [CartController::class,'destroyAll']);

// Route::get('/tag', function(){
//     return Tag::with('product')->get();
// });

Route::get('/recentproducts', [ProductController::class, 'recent']);
Route::get('/relatedproducts/{slug}', [ProductController::class, 'related']);
Route::get('/category_products/{slug}', [ProductController::class, 'category_products']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/product/{slug}', [ProductController::class, 'show']);

Route::post('/favourite/{id}', [FavouriteController::class, 'add']);
Route::delete('/favourite/{id}', [FavouriteController::class, 'remove']);

Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders/add', [OrderController::class, 'create']);
Route::post('/orders/payment/{id}', [OrderController::class, 'payment']);
Route::put('/orders/{id}/add', [OrderController::class, 'update']);

Route::post('/register', [AuthController::class, 'register']);