<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8' //['confirmed']
            // 'password_confirmation' => ['required'],
        ]);

        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'User'
        ]);

        return response()->json(['status' => true, 'msg' => 'Register success']);
    }

    public function user_details()
    {

        $userDetail = UserDetail::where('user_id', Auth::user()->id)->first();

        return response()->json($userDetail, 200);
    }

    public function update(Request $request){

        $user = User::findOrFail(Auth::user()->id);

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        $userDetail = UserDetail::where('user_id', Auth::user()->id)->first();

        
        if ($userDetail == null) {
            UserDetail::create([
                'user_id' => Auth::user()->id,
                'address' => $request->address,
                'city' => $request->city,
                'province' => $request->province,
                'zipcode' => $request->zipcode,
                'phone_number' => $request->phone_number
            ]);
        } else {
            $userDetail->update([
                'address' => $request->address,
                'city' => $request->city,
                'province' => $request->province,
                'zipcode' => $request->zipcode,
                'phone_number' => $request->phone_number
            ]);
        }

        return response()->json(['status' => true, 'msg' => 'User updated']);
    }
}