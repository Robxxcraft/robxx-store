<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = ['title', 'slug', 'description', 'category_id', 'price', 'stok', 'user_id', 'photo'];

    protected $casts = ['favourited_count' => 'boolean'];
    
    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tag(){
        return $this->belongsToMany(Tag::class);
    }

    public function favourite(){
        return $this->hasMany(Favourite::class);
    }

    public function favourited(){
        return $this->hasOne(Favourite::class)->where('user_id', isset(Auth::user()->id) ? Auth::user()->id : 0);
    }
}
