<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('product')->get();
        return response()->json($categories, 200);
    }

    public function homecategory()
    {
        $categories = Category::take(8)->get();
        return response()->json($categories, 200);
    }

    public function create(Request $request)
    {

        $request->validate([
            'name' => 'required|min:3|unique:categories,name'
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);
            
        return response()->json('Category added successfully', 201);
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);

        return response()->json($category, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|min:3|unique:categories,name,'.$id
        ]);

        $category = Category::findOrFail($id);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json('Category updated successfully', 201);
    }

    public function delete($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json('Category deleted sucessfullfy', 200);
    }

    public function deleteAll()
    {
        DB::table('categories')->delete();

        return response()->json('All Categories deleted', 200);
    }
    
}
