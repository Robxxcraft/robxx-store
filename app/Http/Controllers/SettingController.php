<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
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
                        Cloudinary::destroy($banner->type);
                    }

                    $bannerPath = Cloudinary::upload($request->file('banner1')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'banner-1',
                        'transformation' => [
                            'width' => 2800,
                            'heigth' => 600,
                        ]
                    ]);
                    $banner->image = $bannerPath->getSecurePath();
                    $banner->update();
                } else {
                    $bannerPath = Cloudinary::upload($request->file('banner1')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'banner-1',
                        'transformation' => [
                            'width' => 2800,
                            'heigth' => 600,
                        ]
                    ]);
                    
                    $n_banner = new Setting();
                    $n_banner->type = 'banner-1';
                    $n_banner->image = $bannerPath->getSecurePath();
                    $n_banner->save();

                }
            } 
            if ($request->hasFile('banner2')) {
                $banner2 = Setting::where('type', 'banner-2')->first();
                if ($banner2) {
                    if (isset($banner2->image)) {
                        Cloudinary::destroy($banner2->type);
                     }

                    $banner2Path = Cloudinary::upload($request->file('banner2')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'banner-2',
                        'transformation' => [
                            'width' => 2800,
                            'heigth' => 600,
                        ]
                    ]);
                    $banner2->image = $banner2Path->getSecurePath();
                    $banner2->update();
                } else {
                    $banner2Path = Cloudinary::upload($request->file('banner2')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'banner-2',
                        'transformation' => [
                            'width' => 2800,
                            'heigth' => 600,
                        ]
                    ]);
                    
                    $n_banner2 = new Setting();
                    $n_banner2->type = 'banner-2';
                    $n_banner2->image = $banner2Path->getSecurePath();
                    $n_banner2->save();
                }
            } 
            
            if ($request->hasFile('banner3')) {
                $banner3 = Setting::where('type', 'banner-3')->first();
                if ($banner3) {
                    if (isset($banner3->image)) {
                        Cloudinary::destroy($banner3->publicId);
                     }

                    $banner3Path = Cloudinary::upload($request->file('banner3')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'banner-3',
                        'transformation' => [
                            'width' => 2800,
                            'heigth' => 600,
                        ]
                    ]);
                    $banner3->image = $banner3Path->getSecurePath();
                    $banner3->update();
                } else {
                    $banner3Path = Cloudinary::upload($request->file('banner3')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'banner-3',
                        'transformation' => [
                            'width' => 2800,
                            'heigth' => 600,
                        ]
                    ]);
                    
                    $n_banner3 = new Setting();
                    $n_banner3->type = 'banner-3';
                    $n_banner3->image = $banner3Path->getSecurePath();
                    $n_banner3->save();
                }
            } 

            if ($request->hasFile('logo')) {
                $logo = Setting::where('type', 'logo')->first();
                if ($logo) {
                    if (isset($logo->image)) {
                        Cloudinary::destroy($logo->type);
                     }

                    $logoPath = Cloudinary::upload($request->file('logo')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'logo',
                        'transformation' => [
                            'width' => 300,
                            'heigth' => 300,
                        ]
                    ]);
                    $logo->image = $logoPath->getSecurePath();
                    $logo->update();
                } else {
                    $logoPath = Cloudinary::upload($request->file('logo')->getRealPath(), [
                        'folder' =>  'user',
                        'public_id' => 'logo',
                        'transformation' => [
                            'width' => 300,
                            'heigth' => 300,
                        ]
                    ]);
                    
                    $n_logo = new Setting();
                    $n_logo->type = 'logo';
                    $n_logo->image = $logoPath->getSecurePath();
                    $n_logo->save();
            }
        }

        return response()->json('Settings Updated', 201);
    }
    
}
