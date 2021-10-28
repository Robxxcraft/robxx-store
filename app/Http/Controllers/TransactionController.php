<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json($transactions, 200);
    }

    public function midtrans($id)
    {
        $order = Order::findOrFail($id);
        $username = Auth::user()->first_name.' '.Auth::user()->last_name;
        $address = $order->address.', '.$order->city.', '.$order->province;

        Transaction::create([
            'order_token' => $order->order_token,
            'total_amount' => $order->total_amount,
            'total_quantity' => $order->total_quantity,
            'payment' => $order->payment,
            'email' => $order->email,
            'username' => $username,
            'phone_number' => $order->phone_number,
            'address' => $address,
        ]);

        $order->order_status = 'Accepted';
        $order->update();

        return response()->json('payment successfully', 201);
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return response()->json('transaction deleted sucessfullfy', 200);
    }    
}