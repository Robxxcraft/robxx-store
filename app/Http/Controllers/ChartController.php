<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;

class ChartController extends Controller
{
    public function index(Product $product)
    {
        $months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $counts = [];
        for($index=1; $index <= 12; $index++) { 
            $counts[] = (int) $product->whereMonth('created_at', $index)->count();   
        }
        $charts = (object) [
            'months' => $months,
            'counts' => $counts
        ];

        return response()->json($charts, 200);
    }
    
}
