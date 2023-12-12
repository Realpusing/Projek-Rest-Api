<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class hubadmin extends Controller
{
    public function panggilan(Request $req)
    {
        

        // Gunakan Eloquent untuk mengambil data dari tabel nomor_hp
        $user=User::pluck('noTelep')->first();
        if ($user) {
            // Lakukan apa pun yang perlu Anda lakukan dengan data yang telah Anda ambil
            $token = "2xxk3uJVp+Zgr3b8@oJa";
            $target = $user; // Gunakan nilai nomor_hp dari hasil query

            // Kirim request dengan Curl menggunakan nilai $target yang telah diambil
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api.fonnte.com/send',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => array(
                    'target' => $target,
                    'message' => 'Dengan Admin Peminjaman Komputer Universitas Sanata Dharma
                                  Fakultas Sains Dan Teknologi',
                ),
                CURLOPT_HTTPHEADER => array(
                    "Authorization: $token"
                ),
            ));

            $response = curl_exec($curl);

            curl_close($curl);
            echo $response;
        } else {
            // Handle jika data tidak ditemukan
            echo "Masukan Nomor Hp yang Falid";
        }
    }
}
