<?php

namespace App\Models;

use App\Models\Messages;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;
    protected $fillable = [
        'room_name',
        'room_type',
    ];


    public function messages()
    {
        return $this->hasMany(Messages::class);
    }

    public function latestMessage()
    {
        return $this->hasOne(Messages::class)->latest('created_at');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_relations');
    }
}
