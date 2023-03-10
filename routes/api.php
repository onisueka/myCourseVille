<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BooksController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\AuthorsController;



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

Route::get('/books', [BooksController::class, 'lists']);
Route::get('/book/{id}', [BooksController::class, 'getById']);
Route::post('/book', [BooksController::class, 'create']);
Route::delete('/book', [BooksController::class, 'delete']);
Route::get('/tags', [TagsController::class, 'lists']);
Route::get('/authors', [AuthorsController::class, 'lists']);
