<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    function index()
    {
        $profiles=Profile::all();
        return response()->json($profiles);
    }

    function store(Request $request)
    {
        $profile=Profile::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'city'=>$request->city,
            'gender'=>$request->gender

        ]);
        return response()->json([
            'message'=>'Profile Created',
            'profile'=>$profile
        ],201);
    }

    function show($id)
    {
        $profile=Profile::find($id);
        if(!$profile)
            {
                return response()->json([
                    'message'=>'Profile not found'
                ],404);
            }
            else{
                return response()->json($profile);
            }
    }

    function update(Request $request, $id)
    {
        $profile=Profile::find($id);
        if(!$profile)
            {
                return response()->json([
                    'message'=>'Profile Not Found'
                ],404);
            }
            else{
                $profile->update([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'city'=>$request->city,
                    'gender'=>$request->gender
                ]);
            }

            return response()->json([
                'message'=>'Profile Updated',
                'profile'=>$profile
            ],200);
    }

    function destroy($id)
    {
        $profile=Profile::find($id);
        if(!$profile)
            {
                return response()->json([
                    'message'=>'Profile Not Found'
                ],404);
            }
            else{
                $profile->delete();
                return response()->json([
                    'message'=>'Profile Deleted'
                ]);
            }
    }
}
