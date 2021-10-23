<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'flash_start', 'flash_end'];

    public $timestamps = false;

    public function product()
    {
        return $this->belongsTo(Product::class)->with('category');
    }
}
