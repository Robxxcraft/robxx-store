<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Password;
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

Route::post('/forgot-password', function (Request $request)  {
   $request->validate(['email' => 'required|email']);

   $status = Password::sendResetLink(
       $request->only('email')
   );

   return response()->json($status, 201);
})->middleware('guest');

Route::post('reset-password', [AuthController::class, 'reset']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/category/add', [CategoryController::class, 'create']);
    Route::get('/category/{id}', [CategoryController::class, 'edit']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/{id}', [CategoryController::class, 'delete']);

    Route::get('/product', [ProductController::class, 'index']);
    Route::post('/product/add', [ProductController::class, 'create']);
    Route::get('/product/{id}/edit', [ProductController::class, 'edit']);
    Route::put('/product/{id}', [ProductController::class, 'update']);
    Route::delete('/product/{id}', [ProductController::class, 'delete']);

    Route::get('/adminorders', [OrderController::class, 'adminOrders']);
    Route::get('/admintransactions', [TransactionController::class, 'index']);
    Route::get('/allusers', [UserController::class, 'index']);

    Route::put('/update-user', [AuthController::class, 'update']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);

    Route::get('/cart', [CartController::class,'index']);
    Route::get('/cart_page', [CartController::class,'cart_page']);
    Route::post('/cart', [CartController::class,'store']);
    Route::delete('/cart/{productId}', [CartController::class,'destroy']);
    Route::post('/cart/incr/{id}', [CartController::class,'incrqty']);
    Route::post('/cart/dcr/{id}', [CartController::class,'dcrqty']);
    Route::delete('/cart-clear', [CartController::class,'cartClear']);
});

Route::get('/recentproducts', [ProductController::class, 'recent']);
Route::get('/relatedproducts/{id}', [ProductController::class, 'related']);
Route::get('/products_by_category/{slug}', [ProductController::class, 'products_by_category']);
Route::get('/allproducts', [ProductController::class, 'allproducts']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/product/{slug}', [ProductController::class, 'show']);

Route::get('/favourited-list', [FavouriteController::class, 'index']);
Route::post('/favourite/{id}', [FavouriteController::class, 'add']);
Route::delete('/favourite/{id}', [FavouriteController::class, 'remove']);

Route::get('/orders', [OrderController::class, 'index']);
Route::get('/order-details/{id}', [OrderController::class, 'orderDetails']);
Route::post('/orders/add', [OrderController::class, 'create']);
Route::post('/orders/payment/{id}', [OrderController::class, 'payment']);
Route::put('/orders/{id}/add', [OrderController::class, 'update']);
Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
Route::get('/orders/{id}/delete', [OrderController::class, 'destroy']);

Route::post('/search', [SearchController::class, 'search']);
Route::get('/tags', [TagController::class, 'hometag']);
Route::get('/tag_products/{slug}', [TagController::class, 'tagProducts']);


Route::post('/register', [AuthController::class, 'register']);
Route::get('/chart', [ChartController::class, 'index']);

Route::get('/sale', [SaleController::class, 'index']);
Route::put('/sale/{id}', [SaleController::class, 'create']);

Route::put('/changebanner', [SettingController::class, 'changeBanner']);
Route::get('/delete-banner', [SettingController::class, 'deleteBanner']);
Route::put('/changelogo', [SettingController::class, 'changeLogo']);