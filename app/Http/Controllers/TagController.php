<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    public function index($tag)
    {
        $tags = Tag::where()->get();
        return response()->json($tags, 200);
    }

    public function hometag()
    {
        $tags = Tag::orderBy('created_at', 'DESC')->take(10)->get();
        return response()->json($tags, 200);
    }

    public function tagProducts($slug)
    {
        $tagProducts = Tag::where('slug', $slug)->with('product', function($q){
            $q->withCount(['favourite','favourited']);
        })->first();
        $tag = $tagProducts->product;
        return response()->json($tag, 200);
    }

    
}
