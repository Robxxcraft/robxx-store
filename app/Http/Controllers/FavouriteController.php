<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use Illuminate\Support\Facades\Auth;

class FavouriteController extends Controller
{
    public function index()
    {
        $categories = Favourite::where('user_id', Auth::user()->id)->with('product')->get();
        return response()->json($categories, 200);
    }

    public function add($id)
    {
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
