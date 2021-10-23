<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use Illuminate\Support\Facades\Auth;

class FavouriteController extends Controller
{
    public function index()
    {
        $favourite = Favourite::orderBy('id', 'DESC')->where('user_id', Auth::user()->id)->with('product', function($q){
            $q->withCount('favourite','favourited')->with('category');
        })->get()->pluck('product');
        return response()->json($favourite, 200);
    }

    public function add($id)
    {
        Favourite::firstOrCreate([
            'user_id' => Auth::user()->id,
            'product_id' => $id,
        ]);

        return response()->json('Favourite added successfully', 201);
    }

    public function remove($id)
    {
        $favourite = Favourite::where('user_id',Auth::user()->id)->where('product_id',$id);
        $favourite->delete();

        return response()->json('Favourite remove successfully', 200);
    }
}
