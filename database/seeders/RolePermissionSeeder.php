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
        Permission::create(['name'=>'delete-admin']);
        Permission::create(['name'=>'add-admin']);
        Permission::create(['name'=>'edit-user']);
        Permission::create(['name'=>'add-item']);
        Permission::create(['name'=>'remove-item']);
        Permission::create(['name'=>'edit-profile']);
        Permission::create(['name'=>'check-item']);
        Permission::create(['name'=>'check-mitra']);
        Permission::create(['name'=>'view-mitra-profile']);
        Permission::create(['name'=>'view-customer-profile']);
        Permission::create(['name'=>'view-item']);
        Permission::create(['name'=>'add-cart']);
        Permission::create(['name'=>'edit-cart']);

        Role::create(['name'=>'developer']);
        Role::create(['name'=>'admin']);
        Role::create(['name'=>'mitra']);
        Role::create(['name'=>'customer']);

        $roleDeveloper  =  Role::findByName('developer');
        $roleDeveloper -> givePermissionTo(Permission::all());
        

        $roleAdmin = Role::findByName('admin');
        $roleAdmin -> givePermissionTo('edit-user');
        $roleAdmin -> givePermissionTo('edit-profile');
        $roleAdmin -> givePermissionTo('check-item');
        $roleAdmin -> givePermissionTo('remove-item');
        $roleAdmin -> givePermissionTo('view-mitra-profile');
        $roleAdmin -> givePermissionTo('view-customer-profile');
        $roleAdmin -> givePermissionTo('edit-cart');

        $roleMitra = Role::findByName('mitra');
        $roleMitra -> givePermissionTo('edit-profile');
        $roleMitra -> givePermissionTo('view-customer-profile');

        $roleCustomer = Role::findByName('customer');
        $roleCustomer -> givePermissionTo('edit-profile');
        $roleCustomer -> givePermissionTo('edit-cart');
        $roleCustomer -> givePermissionTo('add-cart');
        $roleCustomer -> givePermissionTo('view-mitra-profile');

    }
}
