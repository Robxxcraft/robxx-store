<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();
        return response()->json($tags, 200);
    }

    public function create(Request $request)
    {
        Tag::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json(['success' => 'category added successfully', 201]);
    }

    public function edit($id)
    {
        $tag = Tag::findOrFail($id);

        return response()->json($tag, 200);
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $tag->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json(['success' => 'tag updated successfully']);
    }

    public function delete($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json(['success' => 'tag deleted sucessfullfy']);
    }
}
