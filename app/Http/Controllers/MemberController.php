<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    function index()
    {
        $members=Member::all();
        return response()->json($members);
    }

    function store(Request $request)
    {
        $member=Member::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender,
        ]);

        return response()->json([
            'message'=>'Member Added',
            'member'=>$member
        ],201);
    }

    function show($id)
    {
        $member=Member::find($id);
        if(!$member)
            {
                return response()->json([
                    'message'=>'Member Not Found'
                ],404);
            }
        else{
                return response()->json($member);
            }

    }

    function update(Request $request,$id)
    {
        $member=Member::find($id);
        if(!$member)
            {
                return response()->json([
                    'message'=>'Member Not Found'
                ],404);
            }

            else{
                $member->update([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'phone'=>$request->phone,
                    'city'=>$request->city,
                    'gender'=>$request->gender,
                ]);
            }

            return response()->json([
                'message'=>'Member Updated',
                'member'=>$member
            ]);
    }

    function destroy($id)
    {
        $member=Member::find($id);
        if(!$member)
            {
                return response()->json([
                    'message'=>'Member Not Found'
                ],404);
            }

            else{
                $member->delete();
                return response()->json([
                    'message'=>'Member Deleted'
                ],204);
            }
    }
}
