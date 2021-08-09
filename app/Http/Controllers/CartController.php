<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $cart = Cart::with(['user','product'])->where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->get();
        return response()->json($cart, 200);
    }

    public function cart_page()
    {
        $cart = Cart::with(['product'])->where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->paginate(5);
        $index = $cart->firstItem();
        return response()->json(['cart' => $cart, 'index' => $index], 200);
    }

    public function store(Request $request)
    {
        $item = Cart::where('user_id', Auth::user()->id)->where('product_id', $request->product_id);

        if ($item->count()) {
            $item->increment('quantity', $request->quantity);
        } else {
            $item = Cart::create([
                'user_id' => Auth::user()->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Cart added'],201);
    }

    public function destroy($productId)
    {
    	$item = Cart::findOrFail($productId);
        $item->delete();
       
        return response()->json($item, 200);
    }

    public function destroyAll()
    {
        Cart::truncate();
    }
}
