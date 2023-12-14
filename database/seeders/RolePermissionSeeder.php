<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name'=>'request-borrowing-computer']);
        Permission::create(['name'=>'add-item']);
        Permission::create(['name'=>'remove-item']);
        Permission::create(['name'=>'edit-profile']);
        Permission::create(['name'=>'check-item']);
        Permission::create(['name'=>'view-user-profile']);
        Permission::create(['name'=>'view-item']);
        Permission::create(['name'=>'add-cart']);
        Permission::create(['name'=>'edit-cart']);

        Role::create(['name'=>'admin']);
        Role::create(['name'=>'user']);

        $roleAdmin  =  Role::findByName('admin');
        $roleAdmin -> givePermissionTo(Permission::all());
        

        $roleUser = Role::findByName('user');
        $roleUser -> givePermissionTo('request-borrowing-computer');
        $roleUser -> givePermissionTo('edit-profile');
        $roleUser -> givePermissionTo('check-item');
        $roleUser -> givePermissionTo('remove-item');
        $roleUser -> givePermissionTo('edit-cart');

    }
}
