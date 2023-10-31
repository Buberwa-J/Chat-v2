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
        Schema::create('friendships', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum('status', ['pending', 'accepted', 'blocked']);

            //FOREIGN KEY(S)
            $table->unsignedBigInteger('user_one');
            $table->unsignedBigInteger('user_two');

            //FOREIGN KEY(S) DEFINITIONS
            $table->foreign('user_one')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_two')->references('id')->on('users')->onDelete('cascade');

            $table->index(['user_one', 'user_two']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friendships');
    }
};
