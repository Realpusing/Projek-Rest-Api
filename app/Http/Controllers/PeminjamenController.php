<?php

namespace App\Http\Controllers;
use App\Models\Peminjamens; // Pastikan Anda mengimpor atau menggunakan namespace yang benar untuk model Post
use Illuminate\Http\Request;
use App\Models\users; // Pastikan Anda mengimpor atau menggunakan namespace yang benar untuk model Post

class PeminjamenController extends Controller
{
    public function peminjamentampil()
    {
        // Mengambil data peminjaman dengan user terkait
        $peminjaman = Peminjamens::with('user')->get();
        return response()->json($peminjaman);
    }

    public function addpeminjmanes(Request $req)
    {
        // Validasi input sebelum menyimpan ke dalam database
        $req->validate([
            'idkomputer' => 'required',
            'idkelas' => 'required',
            'iduser' => 'required',
            'idadmin' => 'required',
            'jumlahPinjam' => 'required',
            'alasan' => 'required',
            'status' => 'required',
            'tanggal_dan_jam_pinjam' => 'required',
            'tanggal_dan_jam_kembali' => 'required',
        ]);

        $peminjaman = new Peminjamens();
        $peminjaman->idkomputer = $req->input('idkomputer');
        $peminjaman->idkelas = $req->input('idkelas');
        $peminjaman->iduser = $req->input('iduser');
        $peminjaman->idadmin = $req->input('idadmin');
        $peminjaman->jumlahPinjam = $req->input('jumlahPinjam');
        $peminjaman->alasan = $req->input('alasan');
        $peminjaman->status = $req->input('status');
        $peminjaman->tanggal_dan_jam_pinjam = $req->input('tanggal_dan_jam_pinjam');
        $peminjaman->tanggal_dan_jam_kembali = $req->input('tanggal_dan_jam_kembali');

        $peminjaman->save();
        return response()->json(['message' => 'Data peminjaman berhasil disimpan'], 201);
    }
}


