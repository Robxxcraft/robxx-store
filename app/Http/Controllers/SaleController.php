<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use Carbon\Carbon;

class SaleController extends Controller
{
    public function index()
    {
        $sale = Sale::whereDate('flash_start', '<=',  Carbon::now())->whereDate('flash_end', '>=',  Carbon::now())->with('product')->get();
        return response()->json($sale, 200);
    }

    public function create(Request $request, $id)
    {
        $request->validate([
            'flash_start' => 'required|date',
            'flash_end' => 'required|date|after_or_equal:flash_start',
        ]);


        Sale::create([
            'product_id' => $id,
            'flash_start' => $request->flash_start,
            'flash_end' => $request->flash_end,
        ]);
        
        return response()->json('Sale Created', 201);
    }

    public function destroy($id)
    {
        $sale = Sale::find($id);
        $sale->delete();

        return response()->json('Sale Deleted',200);
    }
}
