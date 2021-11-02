<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Image;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'token' => 'required',
        ]);


        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
            
        return $user->createToken($request->token)->plainTextToken;
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('logout');
    }

    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'password_confirmation' => 'required'
        ]);

        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'User'
        ]);

        return response()->json('Account Registered Successfully', 201);
    }

    public function user_details()
    {

        $userDetail = UserDetail::where('user_id', Auth::user()->id)->first();

        return response()->json($userDetail, 200);
    }

    public function update(Request $request){

        $request->validate([
            'first_name' => 'required',
            'phone_number' => 'numeric|nullable'
        ]);
        
        $user = User::findOrFail(Auth::user()->id);

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        $userDetail = UserDetail::where('user_id', Auth::user()->id)->first();

        if ($userDetail == null) {
            $userDetail = UserDetail::create([
                'user_id' => Auth::user()->id,
                'address' => $request->address,
                'city' => $request->city,
                'province' => $request->province,
                'zipcode' => $request->zipcode,
                'phone_number' => $request->phone_number
            ]);

            if ($request->hasFile('photo')) {
                $imageName = time().'_'.Str::random(10).'.'.$request->photo->extension();
                $image_resize = Image::make($request->photo)->resize(100, 100);
                $image_resize->save(public_path('user/photo/').$imageName);
                $userDetail->photo = $imageName;
                $userDetail->save();
            }
            
        } else {
            if ($request->hasFile('photo') && file_exists(public_path('user/photo/').$userDetail->photo)) {
                unlink(public_path('user/photo/').$userDetail->photo);
            }

            $userDetail->update([
                'address' => $request->address,
                'city' => $request->city,
                'province' => $request->province,
                'zipcode' => $request->zipcode,
                'phone_number' => $request->phone_number
            ]);

            if ($request->hasFile('photo')) {
                $imageName = time().'_'.Str::random(5).'.'.$request->photo->extension();
                $image_resize = Image::make($request->photo)->resize(100, 100);
                $image_resize->save(public_path('user/photo/').$imageName);
                $userDetail->photo = $imageName;
                $userDetail->save();
            }
        }

        return response()->json('Profile Updated', 201);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed'
        ]);

        $status = Password::reset(
            $request->only('email','password','password_confirmation','token'),
            function($user) use($request) {
                $user->forceFill([
                    'password' =>  Hash::make($request->password),
                    'remember_token' =>  Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response('Password reset successfully', 201);
        }

        return response([
            'message' => __($status)
        ], 500);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'min:8', 'confirmed'],
            'password_confirmation' => ['required'],
        ]);
            
        if (Hash::check($request->current_password, Auth::user()->password)) {
            Auth::user()->update(['password'=> Hash::make($request->password)]);
            return response()->json('Your password has been updated', 201);
        }

        throw ValidationException::withMessages([
            'current_password' => 'Your current password does not match with our record'
        ]);
    }


    public function deleteAccount()
    {
        
    }
}