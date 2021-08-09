<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::orderBy('created_at', 'DESC')->take(10)->get();
        return response()->json($tags, 200);
    }

    public function tagProducts()
    {
        $tags = Tag::all();
        return response()->json($tags, 200);
    }

    
}
