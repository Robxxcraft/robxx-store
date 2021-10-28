<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\UserDetail;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::user()->id)->with('orderdetails.product')->orderBy('id', 'DESC')->get();
        
        return response()->json($orders, 200);
    }

    public function show($id)
    {
        $order = Order::where('user_id', Auth::user()->id)->with('orderdetails.product', function($q){
            $q->with('category');
        })->find($id);
        
        return response()->json($order, 200);
    }

    public function adminShowOrder($id)
    {
        $order = Order::with(['orderdetails.product.category', 'user'])->find($id);

        
        return response()->json($order, 200);
    }

    public function adminOrders()
    {
        $orders = Order::with('user')->get();
        
        return response()->json($orders, 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'address' => 'required',
            'city' => 'required',
            'province' => 'required',
            'zipcode' => 'required|numeric',
            'phone_number' => 'required|numeric',
            'total_quantity' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'payment' => 'required',
        ]);

        if ($request->payment == 'Midtrans') {
            $order_stts = 'Pending';
        } else {
            $order_stts = 'Accepted';
        }
        
        $order = Order::create([
            'user_id' => auth('sanctum')->user()->id,
            'address' => $request->address,
            'city' => $request->city,
            'province' => $request->province,
            'zipcode' => $request->zipcode,
            'phone_number' => $request->phone_number,
            'total_quantity' => $request->total_quantity,
            'total_amount' => $request->total_amount,
            'payment' => $request->payment,
            'order_status' => $order_stts,
        ]);

        $carts = Cart::where('user_id', auth('sanctum')->user()->id)->get();

        if (isset($order)) {
            foreach ($carts as $cart) {
                OrderDetails::create([
                    'order_id' => $order->id,
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                ]);
            }

            $carts = Auth::user()->cart;
            foreach ($carts as $cart) {
                $cart = Cart::find($cart->id);
                $cart->delete();
            }

            if ($order->payment == 'COD') {
                $username = Auth::user()->first_name.' '.Auth::user()->last_name;
                $address = $order->address.', '.$order->city.', '.$order->province;

                Transaction::create([
                    'order_token' => $order->id,
                    'total_amount' => $order->total_amount,
                    'total_quantity' => $order->total_quantity,
                    'payment' => $order->payment,
                    'email' => Auth::user()->email,
                    'username' => $username,
                    'phone_number' => $order->phone_number,
                    'address' => $address,
                ]);
            }

            return response()->json('Order Created Successfully', 201);
        }

        return response()->json('Some Error Occured',500);

    }

    public function payment($id)
    {
            $order = Order::findOrFail($id);
            \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            \Midtrans\Config::$isProduction = false;
            \Midtrans\Config::$isSanitized = true;
            \Midtrans\Config::$is3ds = true;
            
            $params = [
                'transaction_details' => [
                    'order_id' => rand(),
                    'gross_amount' => $order->total_amount
                ],
                'customer_details' => [
                    'first_name' => Auth::user()->first_name,
                    'last_name' => Auth::user()->last_name,
                    'email' => Auth::user()->email,
                    'phone' => $order->phone_number,
                ],
            ];

            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $order->order_token = $snapToken;
            $order->update();
            return response()->json($snapToken,201);
    }

    public function paymentSuccess($id)
    {
        $order = Order::findOrFail($id);
        $order->update([
            'order_status' => 'Shipped'
        ]);

        Transaction::create([
            'order_token' => 1, 
            'total_amount' => 1, 
            'total_quantity' => 1, 
            'email' => 1, 
            'username' => 1, 
            'phone_number' => 1, 
            'address' => 1
        ]);

        return response()->json('Payment Successfully', 201);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        $order->delete();

        return response()->json('Order Deleted Successfully', 201);
    }


    public function cancel($id)
    {
        $order = Order::find($id);
        $order->order_status = 'Cancelled';
        $order->update();

        return response()->json('Order Cancelled', 201);
    }


}
