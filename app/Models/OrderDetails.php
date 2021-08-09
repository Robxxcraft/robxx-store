<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $fillable = ['order_id', 'product_id', 'quantity'];

    public function order(){
        return $this->belongsTo(Order::class);
    }
}
