<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicantRequest;
use App\Models\Applicant;

class ApplicantController extends Controller
{
    function index()
    {
        $applicants=Applicant::all();
        return response()->json($applicants);
    }

    function store(ApplicantRequest $request)
    {
        $applicant=Applicant::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender
        ]);

        return response()->json([
            "message"=>"Applicant Created",
            'applicant'=>$applicant
        ],201);
    }

    function show($id)
    {
        $applicant=Applicant::find($id);
        if(!$applicant)
            {
                return response()->json([
                    'message'=>'Applicant Not Found'
                ],404);
            }

            else{
                return response()->json($applicant);
            }
    }

    function update(ApplicantRequest $request,$id)
    {
        $applicant=Applicant::find($id);

        if(!$applicant)
            {
                return response()->json([
                    'message'=>'Applicant Not Found'
                ],404);
            }
            else{
                $applicant->update([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'city'=>$request->city,
            'gender'=>$request->gender
                ]);

                return response()->json([
                    'message'=>'Applicant Updated'
                ]);
            }
    }

    function destroy($id)
    {
        $applicant=Applicant::find($id);

        if(!$applicant)
            {
                return response()->json([
                    'message'=>'Applicant Not Found'
                ],404);
            }

            else{
                $applicant->delete();
                return response()->json([
                    'message'=>'Applicant Delete'
                ],200);
            }
    }
}
