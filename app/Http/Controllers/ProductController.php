<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdminProduct;
use App\Http\Resources\ProductByCategory;
use App\Http\Resources\ProductsResource;
use App\Http\Resources\RecentProduct;
use App\Http\Resources\SaleProduct;
use App\Models\Product;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        // $prod = new ProductResource($products);
        $products = Product::with(['category', 'user', 'tag'])->get();
        return AdminProduct::collection($products);
    }

    public function recent()
    {
        $products = Product::with('category')->orderBy('created_at', 'DESC')->take(5)->get();
        return RecentProduct::collection($products);
    }

    public function related($id)
    {
        $products = Product::with('category')->orderBy('created_at', 'DESC')->where('category_id', $id)->take(5)->get();
        return response()->json($products, 200);
    }

    public function sale()
    {
        $products = Product::with('category')->take(5)->get();
        return SaleProduct::collection($products);
    }

    public function allproducts()
    {
        $products = Product::with('category')->withCount('favourite','favourited')->paginate(12);
        return ProductsResource::collection($products);
        
    }

    public function products_by_category($slug)
    {
        $products =  Product::with('category')->withCount('favourite','favourited')->whereHas('category', function($q)use($slug){
            $q->where('slug', $slug);
        })->paginate(12);
        // $products = Product::with('category')->withCount('favourite','favourited')->where('category_id', $category_id->id)->paginate(12);
        
        return ProductByCategory::collection($products);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|unique:products,title',
            'description' => 'min:3|max:500|nullable',
            'category_id' => 'numeric|required',
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
            $uploadImg = Cloudinary::upload($request->file('photo')->getRealPath(), [
                'folder' =>  'product',
                'public_id' => $product->id,
                'transformation' => [
                    'width' => 600,
                    'heigth' => 400,
                ]
            ]);
            $product->photo = $uploadImg->getSecurePath();
            $product->save();
        }

        $product_tag = Product::findOrFail($product->id);

        $tags = $request->tags;
        
        
        if ($request->has('tags')) {
            foreach($tags as $tag){
                $tag = Tag::firstOrCreate([
                    'name' => strtolower($tag),
                    'slug' => Str::slug($tag)
                ]);

                $product_tag->tag()->attach($tag->id);
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
            'category_id' => 'required|numeric',
            'price' => 'required|numeric',
            'stok' => 'required|numeric',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('photo')) {
            Cloudinary::destroy($product->publicId);
                      
            $uploadImg = Cloudinary::upload($request->file('photo')->getRealPath(), [
                'folder' =>  'product',
                'public_id' => $product->id,
                'transformation' => [
                    'width' => 600,
                    'heigth' => 400,
                ]
            ]);
            $product->photo = $uploadImg->getSecurePath();
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
                $tag = Tag::firstOrCreate([
                    'name' => strtolower($tag),
                    'slug' => Str::slug($tag)
                ]);

                $product->tag()->attach($tag->id);
            }
        }

        return response()->json('Product updated successfully', 201);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        if (isset($product->photo)) {
           Cloudinary::destroy($product->id);
        }
        $product->delete();

        return response()->json('Product deleted sucessfullfy', 200);
    }

    public function deleteAll()
    {
        $products = Product::all();
        
        foreach ($products as $product) {
            if (isset($product->photo)) {
                Cloudinary::destroy($product->id);
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