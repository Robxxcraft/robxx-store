<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Product;

class TagController extends Controller
{
    public function hometag()
    {
        $tags = Tag::has('product')->withCount('product')->orderBy('product_count', 'DESC')->take(10)->get();
        return response()->json($tags, 200);
    }

    public function tagProducts($slug)
    {
        $product = Product::with('category')->withCount('favourite','favourited')->whereHas('tag', function($q)use($slug){
            $q->where('slug', $slug);
        })->orderBy('created_at', 'DESC')->paginate(12);

        return response()->json($product, 200);
    }

    
}
