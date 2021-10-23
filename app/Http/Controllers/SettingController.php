<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Image;
use Illuminate\Support\Str;
use App\Models\Transaction;
use App\Models\User;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all();
        return response()->json($settings, 200);
    }

    public function count()
    {
        $user = User::count();
        $cod = Transaction::where('payment', 'COD')->sum('total_amount');
        $midtrans = Transaction::where('payment', 'Midtrans')->sum('total_amount');
        return response()->json(['cod' => $cod,'midtrans' => $midtrans,'user' => $user], 200);
    }

    public function banner()
    {
        $setting = Setting::where('type', 'like', "%banner%")->get();
        return response()->json($setting, 200);
    }

    public function logo()
    {
        $setting = Setting::where('type', 'logo')->first();
        return response()->json($setting, 200);
    }

    public function updateSetting(Request $request)
    {
            if ($request->hasFile('banner1')) {
                $banner = Setting::where('type', 'banner-1')->first();
                if ($banner) {
                    if (isset($banner->image)) {
                        unlink(public_path('/assets/images/banner/').$banner->image);
                    }

                    $bannerNm = 'banner-1'.'.'.$request->banner1->extension();
                    $image_resize = Image::make($request->banner1)->resize(2800, 600);
                    $image_resize->save(public_path('/assets/images/banner/').$bannerNm);
                    $banner->image = $bannerNm;
                    $banner->update();
                } else {
                    $bannerNm = 'banner-1'.'.'.$request->banner1->extension();
                    $image_resize = Image::make($request->banner1)->resize(2800, 600);
                    $image_resize->save(public_path('/assets/images/banner/').$bannerNm);
                    
                    $n_banner = new Setting();
                    $n_banner->type = 'banner-1';
                    $n_banner->image = $bannerNm;
                    $n_banner->save();

                }
            } 
            if ($request->hasFile('banner2')) {
                $banner2 = Setting::where('type', 'banner-2')->first();
                if ($banner2) {
                    if (isset($banner2->image)) {
                        unlink(public_path('/assets/images/banner/').$banner2->image);
                    }

                    $bannerNm2 = 'banner-2'.'.'.$request->banner2->extension();
                    $image_resize2 = Image::make($request->banner2)->resize(2800, 600);
                    $image_resize2->save(public_path('/assets/images/banner/').$bannerNm2);
                    $banner2->image = $bannerNm2;
                    $banner2->update();
                } else {
                    $bannerNm2 = 'banner-2'.'.'.$request->banner2->extension();
                    $image_resize2 = Image::make($request->banner2)->resize(2800, 600);
                    $image_resize2->save(public_path('/assets/images/banner/').$bannerNm2);
                    
                    $n_banner2 = new Setting();
                    $n_banner2->type = 'banner-2';
                    $n_banner2->image = $bannerNm2;
                    $n_banner2->save();
                }
            } 
            if ($request->hasFile('banner3')) {
                $banner3 = Setting::where('type', 'banner-3')->first();
                if ($banner3) {
                    if (isset($banner3->image)) {
                        unlink(public_path('/assets/images/banner/').$banner3->image);
                    }

                    $bannerNm3 = 'banner-3'.'.'.$request->banner3->extension();
                    $image_resize3 = Image::make($request->banner3)->resize(2800, 600);
                    $image_resize3->save(public_path('/assets/images/banner/').$bannerNm3);
                    $banner3->image = $bannerNm3;
                    $banner3->update();
                } else {
                    $bannerNm3 = 'banner-3'.'.'.$request->banner3->extension();
                    $image_resize3 = Image::make($request->banner3)->resize(2800, 600);
                    $image_resize3->save(public_path('/assets/images/banner/').$bannerNm3);
                    
                    $n_banner3 = new Setting();
                    $n_banner3->type = 'banner-3';
                    $n_banner3->image = $bannerNm3;
                    $n_banner3->save();
                }
            } 

            if ($request->hasFile('logo')) {
                $logo = Setting::where('type', 'logo')->first();
                if ($logo) {
                    if (isset($logo->image)) {
                        unlink(public_path('/assets/images/').$logo->image);
                    }

                    $logoNm = 'logo'.'.'.$request->logo->extension();
                    $image_resize4 = Image::make($request->logo)->resize(400, 400);
                    $image_resize4->save(public_path('/assets/images/').$logoNm);
                    $logo->image = $logoNm;
                    $logo->update();
                } else {
                    $logoNm = 'logo'.'.'.$request->logo->extension();
                    $image_resize4 = Image::make($request->logo)->resize(400, 400);
                    $image_resize4->save(public_path('/assets/images/').$logoNm);
                    
                    $n_logo = new Setting();
                    $n_logo->type = 'logo';
                    $n_logo->image = $logoNm;
                    $n_logo->save();
            }
        }

        return response()->json('Settings Updated', 201);
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
