<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $developer = User::create([
            'name'=>'developer',
            'email'=>'developer@gmail.com',
            'password' => bcrypt('12345'),
        ]);
        $developer->assignRole('admin');
        
        $admin = User::create([
            'name'=>'admin',
            'email'=>'admin@gmail.com',
            'password' => bcrypt('12345'),
        ]);
        $admin->assignRole('admin');
        
        $mitra = User::create([
            'name'=>'mitra',
            'email'=>'mitra@gmail.com',
            'password' => bcrypt('12345'),
        ]);
        $mitra->assignRole('mitra');
        

        $costumer = User::create([
            'name'=>'customer',
            'email'=>'customer@gmail.com',
            'password' => bcrypt('12345'),
        ]);
        $costumer->assignRole('customer');
    }
}
