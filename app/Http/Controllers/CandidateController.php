<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    function index()
    {
        $candidates=Candidate::all();
        return response()->json($candidates);
    }

    function store(Request $request)
    {
        $candidate=Candidate::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender,
            
        ]);
        return response()->json([
            'message'=>'Candidate Added',
            'candidate'=>$candidate
        ],201);
    }

    function show($id)
    {
        $candidate=Candidate::find($id);
        if(!$candidate)
            {
                return response()->json([
                    'message'=>'Candididate Not Found'
                ],404);
            }

            else{
                return response()->json($candidate);
            }
    }

    function update(Request $request,$id)
    {
        $candidate=Candidate::find($id);
        if(!$candidate)
        {
            return response()->json([
                'message'=>'Candididate Not Found'
            ],404);
        }
        else{
                 $candidate->update([
                'name'=>$request->name,
                'email'=>$request->email,
                'phone'=>$request->phone,
                'city'=>$request->city,
                'gender'=>$request->gender,
            ]);

            return response()->json([
                'message'=>'Candidate Updated',
                'candidate'=>$candidate
            ],200);
        }
            
    }

    function destroy($id)
    {
        $candidate=Candidate::find($id);
        if(!$candidate)
        {
            return response()->json([
                'message'=>'Candidate Not Found'
            ],404);
        }

        else{
            $candidate->delete();
            return response()->json([
                'message'=>'Candidate Deleted'
            ]);
        }
    }
}
