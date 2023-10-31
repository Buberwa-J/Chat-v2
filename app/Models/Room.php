<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_relations');
    }
}
