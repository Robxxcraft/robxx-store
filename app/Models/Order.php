<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'address',
        'city',
        'province',
        'zipcode', 
        'phone_number',
        'total_quantity',
        'total_amount',
        'payment',
        'order_status'
    ];

    public function orderdetails(){
        return $this->hasMany(OrderDetails::class);
    }
}
