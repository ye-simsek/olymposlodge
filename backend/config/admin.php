<?php

return [

    /*
    |--------------------------------------------------------------------------
    | First admin account
    |--------------------------------------------------------------------------
    |
    | Used once by AdminUserSeeder to create the first Filament admin. The
    | seeder never touches an account that already exists, so changing these
    | values later does not reset anyone's password.
    |
    */

    'email' => env('ADMIN_EMAIL', 'admin@olymposlodge.com.tr'),

    'password' => env('ADMIN_PASSWORD'),

];
