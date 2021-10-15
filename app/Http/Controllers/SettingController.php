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


    public function changeBanner(Request $request,$id)
    {
        $banner = Setting::find($id);
        
        if ($request->hasFile('photo')) {

            $imageName = time().'.'.$request->photo->extension();
            $path = public_path('user/photo');
            $userDetail->photo = $imageName;
            $userDetail->save();
            $request->photo->move($path, $imageName);
        }

        return response()->json('Banner Changed', 201);
    }

    public function changeLogo(Request $request, $id)
    {
        $category = Setting::findOrFail($id);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json(['success' => 'category updated successfully']);
    }
    
}
