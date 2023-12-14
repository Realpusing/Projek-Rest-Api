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
        $admin = User::create([
            'name'=>'admin',
            'email'=>'admin@gmail.com',
            'password' => bcrypt('12345'),
            'noTelep' => '085710905079'
        ]);
        $admin->assignRole('admin');
        
        $user = User::create([
            'name'=>'Dian',
            'email'=>'anisgurnadi21@gmail.com',
            'password' => bcrypt('215314088'),
            'noTelep' => '082153394485'
        ]);
        $user->assignRole('user');
        
        $user = User::create([
            'name'=>'Ariel',
            'email'=>'arielstevano17@gmail.com',
            'password' => bcrypt('215314138'),
            'noTelep' => '085641006269'
        ]);
        $user->assignRole('user');
    
    }
}
