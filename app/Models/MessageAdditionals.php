<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageAdditionals extends Model
{
    use HasFactory;
    protected $fillable = [
        'sent_at',
        'delivered_at',
        'read_at',
        'message_id'
    ];

    public function mainMessage()
    {
        return $this->belongsTo(Messages::class);
    }
}
