<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $fillable = ['order_id', 'product_id', 'quantity'];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
