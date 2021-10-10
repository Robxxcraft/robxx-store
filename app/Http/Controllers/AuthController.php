<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
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

        return response()->json(['status' => true, 'msg' => 'Register success']);
    }

    public function user_details()
    {

        $userDetail = UserDetail::where('user_id', Auth::user()->id)->first();

        return response()->json($userDetail, 200);
    }

    public function update(Request $request){

        $request->validate([
            'first_name' => 'required',
        ]);
        
        $user = User::findOrFail(Auth::user()->id);

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        $userDetail = UserDetail::where('user_id', Auth::user()->id)->first();
        

        if ($request->hasFile('photo') && isset($userDetail->photo)) {
            unlink(public_path('user/photo/').$userDetail->photo);
        }

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

                $imageName = time().'.'.$request->photo->extension();
                $path = public_path('user/photo');
                $userDetail->photo = $imageName;
                $userDetail->save();
                $request->photo->move($path, $imageName);
            }
        } else {
            $userDetail->update([
                'address' => $request->address,
                'city' => $request->city,
                'province' => $request->province,
                'zipcode' => $request->zipcode,
                'phone_number' => $request->phone_number
            ]);

            if ($request->hasFile('photo')) {

                $imageName = time().'.'.$request->photo->extension();
                $path = public_path('user/photo');
                $userDetail->photo = $imageName;
                $userDetail->save();
                $request->photo->move($path, $imageName);
            }
        }

        return response()->json('Profile Updated');
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
            return response([
                'message' => 'Password reset successfully'
            ]);
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
            return response()->json('Your password has been updated');
        }

        throw ValidationException::withMessages([
            'current_password' => 'Your current password does not match with our record'
        ]);
    }


    public function deleteAccount()
    {
        
    }
}