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

    public function recent()
    {
        $products = Product::with(['category'])->orderBy('created_at', 'DESC')->take(5)->get();
        return response()->json($products, 200);
    }

    public function related($slug)
    {
        $id = Product::where('slug', $slug)->pluck('category_id')->first();
        $products = Product::with('category')->orderBy('created_at', 'DESC')->where('category_id', $id)->take(5)->get();
        return response()->json($products, 200);
    }

    public function allproducts()
    {
        $products = Product::with(['category','tag'])->withCount('favourite','favourited')->get();
        return response()->json($products, 200);
    }

    public function products_by_category($slug)
    {
        $category_id = Category::where('slug', $slug)->first(['id']);
        $products = Product::with('category')->where('category_id', $category_id->id)->get();
       return response()->json($products, 200);
    }

    public function create(Request $request)
    {

        $request->validate([
            'title' => 'required|min:3|unique:products,title',
            'description' => 'min:3|max:500',
            'category_id' => 'required',
            'price' => 'required|numeric',
            'stok' => 'required|numeric',
        ]);

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

                $tag_id = Tag::where('name', $tag)->get()->pluck('id');
                
                $product_tag->tag()->attach($tag_id);
            }
        }
        
        return response()->json(['success' => 'product created successfully', 201]);
    }

    public function show($slug)
    {
        $product = Product::with(['category','tag'])->withCount('favourite','favourited')->where('slug', $slug)->first();
        
        return response()->json($product, 200);
    }

    public function edit($id)
    {
        $product = Product::with(['category','tag'])->findOrFail($id);
        
        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|min:3|unique:products,title,'.$id,
            'category_id' => 'required',
            'price' => 'required|numeric',
            'stok' => 'required|numeric',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('photo')) {
            if (isset($product->photo) && file_exists(public_path('images/').$product->photo)) {
                unlink(public_path('images/').$product->photo);
            }
            
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

        if ($request->has('tags')) {
            $tags = $request->tags;
            $product->tag()->detach();
            foreach($tags as $tag){
                Tag::firstOrCreate([
                    'name' => strtolower($tag),
                    'slug' => Str::slug($tag)
                ]);

                $tag_id = Tag::where('name', $tag)->get()->pluck('id');
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

    public function deleteTags($id)
    {
        $product = Product::findOrFail($id);
        $product->tag()->detach();

        return response()->json(['success' => 'Tag deleted sucessfullfy']);
    }
    
}