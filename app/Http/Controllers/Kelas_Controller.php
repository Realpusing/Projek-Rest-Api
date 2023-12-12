<?php

namespace App\Http\Controllers;

use App\Models\kelas; // Pastikan Anda mengimpor atau menggunakan namespace yang benar untuk model Post
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Kelas_Controller extends Controller
{
    
    public function addkelas(Request $req)
    {
        $kelas= new kelas;
        $kelas->idadmin =$req ->input('idadmin');
        $kelas->namakelas =$req -> input ('namakelas');
        $kelas->jumlah_komputer =$req-> input('jumlah_komputer');
        $kelas->fotoke = $req->file('file')->store('fotokelas');
        $kelas->save();
        return $req->input();
    }
    
    public function kelastampil()
    {
       return kelas::all();
    }

    public function ambilGambar(Request $req, $dir = NULL, $filname = NULL){
        switch ($req->method()) {
            case 'GET':
                $filepath = $dir.'/'.$filname;  
                if(Storage::disk('local')->exists($filepath)){
                    $file = Storage::disk('local')->response($filepath);
                    return $file;   
                }
                return abort(404);
                break;
            case 'POST':
                if(Storage::disk('local')->exists($req->filename)){
                    $file = Storage::disk('local')->response($req->filename);
                    return $file;   
                }
                return abort(404);
                break;
            default:
                return abort(404);
                break;
        }
    }
}
