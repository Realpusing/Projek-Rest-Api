<?php

namespace App\Http\Controllers;
use App\Models\Peminjamens; // Pastikan Anda mengimpor atau menggunakan namespace yang benar untuk model Post
use Illuminate\Http\Request;
use App\Models\users; // Pastikan Anda mengimpor atau menggunakan namespace yang benar untuk model Post

class PeminjamenController extends Controller
{
    public function peminjamentampil()
    {
        $peminjaman=Peminjamens::all();
        $user=users::all();
        
       return $peminjaman;
    }
    public function addpeminjmanes(Request $req)
    {
        $peminjamens= new Peminjamens;
        $peminjamens->idkomputer =$req ->input('idkomputer');
        $peminjamens->idkelas =$req -> input ('idkelas');
        $peminjamens->iduser =$req-> input('iduser');
        $peminjamens->idadmin =$req-> input('idadmin');
        $peminjamens->jumlahPinjam =$req-> input('jumlahPinjam');
        $peminjamens->alasan =$req-> input('alasan');
        $peminjamens->status =$req-> input('status');
        $peminjamens->tanggal_dan_jam_pinjam = $req->input('tanggal_dan_jam_pinjam');
        $peminjamens->tanggal_dan_jam_kembali = $req->input('tanggal_dan_jam_kembali');

        $peminjamens->save();
        return $req->input();
    }
}
