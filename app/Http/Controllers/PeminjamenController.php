<?php

namespace App\Http\Controllers;
use App\Models\Peminjamens; // Pastikan Anda mengimpor atau menggunakan namespace yang benar untuk model Post
use Illuminate\Http\Request;
use App\Models\users; // Pastikan Anda mengimpor atau menggunakan namespace yang benar untuk model Post

class PeminjamenController extends Controller
{
    public function peminjamentampil()
    {
        $peminjaman=peminjamens::all();
        $user=users::all();
        
       return $peminjaman;
    }
}
