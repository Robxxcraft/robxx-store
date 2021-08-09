<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['user_id', 'product_id'];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
