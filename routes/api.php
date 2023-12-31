<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Kelas_Controller; // Perbaikan pada namespace 
use App\Http\Controllers\hubAdmin;
use App\Http\Controllers\PeminjamenController; // Perbaikan pada namespace 
use App\Http\Controllers\kirimEmailController; // Perbaikan pada namespace 

Route::get('kelas_tampil', [Kelas_Controller::class, 'kelastampil']);

Route::post('posts',[Kelas_Controller::class,'addkelas']);

Route::get('ambil-gambar/{dir}/{filename}', [Kelas_Controller::class, 'ambilGambar']);

Route::post('ambil-gambar', [Kelas_Controller::class, 'ambilGambar']);
Route::get('panggil',[hubAdmin::class,'panggilan']);
Route::get('peminjamen', [PeminjamenController::class, 'peminjamentampil']);
Route::get('peminjamez', [PeminjamenController::class, 'pemitampil']);

Route::get('komputer/{id}', [Kelas_Controller::class, 'ambilid']);
Route::put('/peminzam/{dataId}/accept',[PeminjamenController::class, 'acceptPeminzam']);
Route::post('addpeminjaman', [PeminjamenController::class, 'addpeminjmanes']);
Route::put('/peminzam/{dataId}/reject', [PeminjamenController::class, 'rejectPeminzam']);
Route::get('email', [kirimEmailController::class, 'index']);

