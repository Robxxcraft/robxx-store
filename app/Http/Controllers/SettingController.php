<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SettingController extends Controller
{
    public function index()
    {
        $categories = Setting::all();
        return response()->json($categories, 200);
    }

    public function create(Request $request)
    {
        $setting = new Setting();

        if ($request->hasFile('banner')) {
            $imageName = time().'.'.$request->banner->extension();
            $path = public_path('admin/banner');
            $setting->banner = $imageName;
            $setting->save();
            $request->banner->move($path, $imageName);
        }
            
        return response()->json(['success' => 'banner added/changed successfully', 201]);
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);

        return response()->json($category, 200);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json(['success' => 'category updated successfully']);
    }

    public function delete($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['success' => 'category deleted sucessfullfy']);
    }
    
}
