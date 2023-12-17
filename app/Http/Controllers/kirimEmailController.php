<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use App\Mail\kirim;
use Exception;

class kirimEmailController extends Controller
{
    public function index()
    {
        try {
           
            Mail::to('anisgurnadi21@gmail.com')->send(new kirim);
            return 'Berhasil Mengirim Email';
        } catch (Exception $e) {
            return 'Gagal Mengirim Email: ' . $e->getMessage();
        }
    }
}
