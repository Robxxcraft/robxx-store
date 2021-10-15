<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $search = Product::with('category')->withCount('favourite','favourited')->Where('title', 'like', "%".$request->searchtext."%")->orwhere('description', 'like', "%".$request->searchtext."%")->orderBy('id', 'desc')->get();
        return response()->json($search,200);
    }
}
