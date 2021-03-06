<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['order_token', 'total_amount', 'total_quantity', 'payment', 'email', 'username', 'phone_number', 'address'];
}
