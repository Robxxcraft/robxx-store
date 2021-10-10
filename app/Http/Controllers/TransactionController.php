<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json($transactions, 200);
    }

    public function create(Request $request)
    {
        Transaction::create([
            'name' => $request->name,
        ]);
            
        return response()->json(['success' => 'category added successfully', 201]);
    }

    public function edit($id)
    {
        $category = Transaction::findOrFail($id);

        return response()->json($category, 200);
    }

    public function update(Request $request, $id)
    {
        $category = Transaction::findOrFail($id);

        $category->update([
            'name' => $request->name,
        ]);

        return response()->json(['success' => 'category updated successfully']);
    }

    public function delete($id)
    {
        $category = Transaction::findOrFail($id);
        $category->delete();

        return response()->json(['success' => 'category deleted sucessfullfy']);
    }
    
}
