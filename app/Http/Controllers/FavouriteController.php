<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
    public function index()
    {
        $categories = Favourite::with('product')->get();
        return response()->json($categories, 200);
    }

    public function add($id)
    {
        // $favourite = new Favourite;
        // $favourite->where('user_id', Auth::user()->id)->where('product_id', $id)->first;
        Favourite::firstOrCreate([
            'user_id' => Auth::user()->id,
            'product_id' => $id,
        ]);

        return response()->json(['success' => 'Favourite added successfully'],201);
    }

    public function remove($id)
    {
        $favourite = Favourite::where('user_id',Auth::user()->id)->where('product_id',$id);
        $favourite->delete();

        return response()->json(['success' => 'Favourite remove successfully']);
    }
}
