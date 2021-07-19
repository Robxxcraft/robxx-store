<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
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

    public function home()
    {
        $products = Product::with(['category'])->orderBy('created_at', 'DESC')->take(8)->get();
        return response()->json($products, 200);
    }


    public function category_products($slug)
    {
        $category_id = Category::where('slug', $slug)->first(['id']);
        $products = Product::with('category')->where('category_id', $category_id->id)->get();
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
        
        if ($request->has('tags')) {
            foreach($tags as $tag){
                Tag::firstOrCreate([
                    'name' => strtolower($tag),
                    'slug' => Str::slug($tag)
                ]);

                $tag_id = Tag::where('name', $tag)->get(['id']);
                
                $product_tag->tag()->attach($tag_id);
            }
        }
        
        return response()->json(['success' => 'product created successfully', 201]);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'user', 'tag'])->findOrFail($id);

        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // if (!empty('$product->photo')) {
        //         unlink(public_path('images').'/'.$product->photo);
        // } 

        if ($request->hasFile('photo')) {
            $imageName = time().'.'.$request->photo->extension();
            $path = public_path('images');
            $product->photo = $imageName;
            $product->update();
            $request->photo->move($path, $imageName);
        }

        $product->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'stok' => $request->stok,
            'user_id' => Auth::user()->id,
        ]);

        $tags = $request->tags;
        
        if ($request->has('tags')) {
            foreach($tags as $tag){
                Tag::firstOrCreate([
                    'name' => strtolower($tag),
                    'slug' => Str::slug($tag)
                ]);

                $tag_id = Tag::where('name', $tag)->get(['id']);
                $product->tag()->attach($tag_id);
        }
        }

        return response()->json(['success' => 'product updated successfully']);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        if (!empty($product->photo) && file_exists(public_path('images').'/'.$product->photo)) {
            unlink(public_path('images').'/'.$product->photo);
        }

        return response()->json(['success' => 'product deleted sucessfullfy']);
    }


    public function deleteTag(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->tag()->detach($request->tag);

        return response()->json(['success' => 'tag deleted sucessfullfy']);
    }
    
}