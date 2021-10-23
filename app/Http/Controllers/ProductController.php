<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Image;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'user', 'tag'])->get();
        return response()->json($products, 200);
    }

    public function recent()
    {
        $products = Product::with('category')->orderBy('created_at', 'DESC')->take(5)->get();
        return response()->json($products, 200);
    }

    public function related($id)
    {
        $products = Product::with('category')->orderBy('created_at', 'DESC')->where('category_id', $id)->take(5)->get();
        return response()->json($products, 200);
    }

    public function sale()
    {
        $products = Product::with('category')->take(5)->get();
        return response()->json($products, 200);
    }

    public function allproducts()
    {
        $products = Product::with('category')->withCount('favourite','favourited')->paginate(12);
        return response()->json($products, 200);
    }

    public function products_by_category($slug)
    {
        $category_id = Category::where('slug', $slug)->first(['id']);
        $products = Product::with('category')->withCount('favourite','favourited')->where('category_id', $category_id->id)->paginate(12);
       return response()->json($products, 200);
    }

    public function create(Request $request)
    {

        $request->validate([
            'title' => 'required|min:3|unique:products,title',
            'description' => 'min:3|max:500|nullable',
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
            
            $imageName = time().'_'.base64_encode(Str::random(5)).'.'.$request->photo->extension();
            $image_resize = Image::make($request->photo)->resize(600, 400);
            $image_resize->save(public_path('images/').$imageName);
            $product->photo = $imageName;
            $product->save();

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
        
        return response()->json('Product created successfully', 201);
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

        return response()->json('Product updated successfully', 201);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        if (!empty($product->photo) && file_exists(public_path('images').'/'.$product->photo)) {
            unlink(public_path('images').'/'.$product->photo);
        }

        return response()->json('Product deleted sucessfullfy', 200);
    }

    public function deleteAll()
    {
        $products = Product::all();
        
        foreach ($products as $product) {
            if (!empty($product->photo) && file_exists(public_path('images').'/'.$product->photo)) {
                unlink(public_path('images').'/'.$product->photo);
            }
        }

        DB::table('products')->delete();

        return response()->json('All Product deleted sucessfullfy', 200);
    }

    public function deleteTags($id)
    {
        $product = Product::findOrFail($id);
        $product->tag()->detach();

        return response()->json('Tag deleted sucessfullfy', 200);
    }
    
}