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
        Schema::create('message_additionals', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('read_at')->nullable();

            // FOREIGN KEY(S)
            $table->unsignedBigInteger('message_id');

            //FOREIGN KEY(S) DEFINITION
            $table->foreign('message_id')->references('id')->on('messages')->onDelete('cascade');

            // INDEXES
            $table->index('read_at');
            $table->index('sent_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_additionals');
    }
};
