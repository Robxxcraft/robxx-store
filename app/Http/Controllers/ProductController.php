<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'user', 'tag'])->get();
        return response()->json($products, 200);
    }

    public function create(Request $request)
    {

        $product = Product::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'stok' => $request->stok,
            'user_id' => Auth::user()->id,
        ]);


        if ($request->hasFile('photo')) {
            $imageName = time().'.'.$request->photo->extension();
            $path = public_path('images');
            $product->photo = $imageName;
            $product->save();
            $request->photo->move($path, $imageName);
        }

        $product_tag = Product::findOrFail($product->id);

        $tags = $request->tags;
        
        foreach($tags as $tag){
                Tag::firstOrCreate([
                    'name' => strtolower($tag),
                    'slug' => Str::slug($tag)
                ]);

                $tag_id = Tag::where('name', $tag)->get(['id']);
                $product_tag->tag()->attach($tag_id);
        }
        
        return response()->json(['success' => 'product created successfully', 201]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        if ($request->hasFile('photo')) {
            unlink(public_path('images').'/'.$product->photo);
        }

        if ($request->hasFile('photo')) {
            $imageName = time().'.'.$request->photo->extension();
            $path = public_path('images');
            $product->photo = $imageName;
            $request->photo->move($path, $imageName);
        }

        $product->title = $request->title;
        $product->slug = Str::slug($request->title);
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->update();

        return response()->json(['success' => 'product updated successfully']);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        if (!empty('$product->photo') && file_exists(public_path('images').'/'.$product->photo)) {
            unlink(public_path('images').'/'.$product->photo);
        }

        return response()->json(['success' => 'product deleted sucessfullfy']);
    }
    
}