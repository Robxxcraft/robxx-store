<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $search = Product::with('category')->withCount('favourite','favourited')->where('title', 'like', "%".$request->searchtext."%")->orWhere('description', 'like', "%".$request->searchtext."%")->orWhere('title', 'like', "%".$request->searchtext."%")->get();
        return response()->json($search,200);
    }
}
