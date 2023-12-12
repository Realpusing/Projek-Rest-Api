<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/test',function(){
    return Inertia::render('test');
})->name('test');



Route::get('/peminjaman',function(){
    return Inertia::render('Peminjaman');
})->name('Peminjaman');

Route::get('/adminn',function(){
    return Inertia::render('Dashboard');
   })-> name('Dashboard');


Route::get('/menupeminjaman',function(){
    return Inertia::render('MenuPeminjam');
})->name('MenuPeminjaman');
Route::get('/', function () {
    return Inertia::render(('Homepage'));
});

Route::get('/menu','kelasController@kelastampil');


Route::get('welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); 
Route::get('welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); 

// Route::get('admin',function(){
//  return '<h1>hello admin</h1>';
// })-> middleware(['auth','verified','role:admin']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('developer', function(){
 return  '<h1>hello this is developer</h1>';
}) -> middleware(['auth','verified','role:developer']);

// Route::get('admin', function(){
//  return  '<h1>hello this is admin</h1>';
// }) -> middleware(['auth','verified','role:admin']);

Route::get('mitra', function(){
 return  '<h1>hello this is mitra</h1>';
}) -> middleware(['auth','verified','role:mitra']);

Route::get('customer', function(){
 return  '<h1>hello this is customer</h1>';
}) -> middleware(['auth','verified','role:customer']);

Route::get('view-customer-profile', function(){
 return  '<h1>Data Customer</h1>';
}) -> middleware(['auth','verified','role_or_permission:view-customer-profile']);

require __DIR__ . '/auth.php';


