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
       
        Schema::create('komputer', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idkelas');
            $table->timestamps();
            $table->foreign('idkelas')->references('id')->on('kelas');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komputer');
    }
};

