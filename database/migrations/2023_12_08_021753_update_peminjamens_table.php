<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('peminjamens', function (Blueprint $table) {
            
                $table->id();
                $table->unsignedBigInteger('idkomputer');
                $table->unsignedBigInteger('idkelas'); // Use 'unsignedBigInteger' instead of 'integer'
                $table->unsignedBigInteger('iduser');
                $table->unsignedBigInteger('idadmin');
                $table->integer('jumlahPinjam');
                $table->string('alasan');
                $table->integer('status');
                $table->timestamp('tanggal_dan_jam_pinjam')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('tanggal_dan_jam_kembali')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamps();
    
                $table->foreign('iduser')->references('id')->on('users');
                $table->foreign('idkelas')->references('id')->on('kelas');
                $table->foreign('idkomputer')->references('id')->on('komputer');
                $table->foreign('idadmin')->references('id')->on('admin');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('peminjamens', function (Blueprint $table) {
            //
        });
    }
};
