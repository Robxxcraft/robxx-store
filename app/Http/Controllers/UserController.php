<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('details')->get();
        return response()->json($users, 200);
    }

    public function addAdmin($id)
    {
        if (Auth::user()->role == 'Superadmin') {
            $user = User::find($id);
            $user->role = 'Admin';
            $user->update();

            return response()->json('Admin added successfully', 201);
        } 
        
        return response()->json('Forbidden Access', 403);
        
    }

    public function deleteAdmin($id)
    {
        if (Auth::user()->role == 'Superadmin') {
            $user = User::find($id);
            $user->role = 'User';
            $user->update();

            return response()->json('Admin deleted successfully', 201);
        } 
        
        return response()->json('Forbidden Access', 403);
        
    }

    public function edit($id)
    {
        if (Auth::user()->role == 'User') {
            return response()->json('Forbidden Access', 403);
        }
        $user = User::with('details')->find($id);
        return response()->json($user, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required',
            'phone_number' => 'numeric|nullable'
        ]);

        $user = User::findOrFail($id);

        if ($user->role == 'Superadmin' && $user->id != Auth::user()->id) {
            throw ValidationException::withMessages(['error' => 'Cannot edit superadmin']);
        }

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name
        ]);

        $userDetail = UserDetail::where('user_id', $id)->first();        

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
                if (isset($userDetail->photo)) {
                    Cloudinary::destroy($userDetail->publicId);
                }

                $photoPath = Cloudinary::upload($request->file('photo')->getRealPath(), [
                    'folder' =>  'user',
                    'transformation' => [
                        'width' => 400,
                        'heigth' => 400,
                    ]
                ]);
                $userDetail->photo = $photoPath->getSecurePath();
                $userDetail->publicId = $photoPath->getPublicId();
                $userDetail->save();
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
                if (isset($userDetail->photo)) {
                    Cloudinary::destroy($userDetail->publicId);
                }

                $photoPath = Cloudinary::upload($request->file('photo')->getRealPath(), [
                    'folder' =>  'user',
                    'transformation' => [
                        'width' => 400,
                        'heigth' => 400,
                    ]
                ]);

                $userDetail->photo = $photoPath->getSecurePath();
                $userDetail->publicId = $photoPath->getPublicId();
                $userDetail->update();
            }
        }

        return response()->json('User updated successfully', 201);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->role == 'Superadmin') {
            throw ValidationException::withMessages(['Error' => 'Cannot delete superadmin']);
        }
        $user->delete();

        return response()->json('User deleted sucessfullfy', 200);
    }
    
}
