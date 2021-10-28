<?php

namespace App\Http\Controllers;

use App\Models\Product;

class SearchController extends Controller
{
    public function search($searchText)
    {
        $search = Product::with('category')->withCount('favourite','favourited')->Where('title', 'like', "%".$searchText."%")->orWhere('description', 'like', "%".$searchText."%")->orderBy('created_at', 'DESC')->paginate(12);
        return response()->json($search,200);
    }
}
