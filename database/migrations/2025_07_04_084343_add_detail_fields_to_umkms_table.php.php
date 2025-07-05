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
        Schema::table('umkms', function (Blueprint $table) {
            // Add new fields for enhanced UMKM detail page
            $table->string('price_range')->nullable()->after('rating');
            $table->string('website')->nullable()->after('facebook');
            $table->string('email')->nullable()->after('website');
            $table->json('facilities')->nullable()->after('email');
            $table->json('opening_hours')->nullable()->after('facilities');
            $table->json('display_photos')->nullable()->after('image');
            $table->string('menu_photo')->nullable()->after('display_photos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('umkms', function (Blueprint $table) {
            $table->dropColumn([
                'price_range',
                'website', 
                'email',
                'facilities',
                'opening_hours',
                'display_photos',
                'menu_photo'
            ]);
        });
    }
};